import Promise from 'bluebird';
import ingredientList from './data/ingredient-list.json';
import foodList from './data/food-list.json';


class ServiceMock {

    retrieveAllIngredients() {
        return new Promise((resolve) => {
            resolve(ingredientList);
        });
    }

    retrieveAllFood() {
        return new Promise((resolve) => {
            resolve(foodList);
        });
    }

    retrieveFoodRequestDetails() {
        return new Promise((resolve) => {
            resolve({
                ingredientList,
                foodList
            });
        });
    }

    promotionFilter(requestList) {
        return new Promise((resolve) => {
            let requestListCloned = JSON.parse(JSON.stringify(requestList));

            return this.retrieveAllFood()
                .then((result) => {
                    const foodListCLoned = result;
                    requestListCloned = requestListCloned.map((requestItem) => {
                        let food = foodListCLoned.find((item) => item._id === requestItem._id);
                        if (requestItem.name && requestItem.price) {
                            food = requestItem;
                        }
                        const ingredientesCloned = food.ingredients.map((ingredientItem) => {
                                const { amount, name, price } = ingredientItem;
                                switch (name) {
                                    case 'Hambúrguer de carne':
                                        const result = (amount / 3);
                                        if (result >= 1){
                                            const newAmount = Math.trunc(result);
                                            ingredientItem.amount = newAmount;
                                        }
                                    break;
                                    case 'Alface':
                                        const bacon = food.ingredients.find((item) => item.name === 'Bacon');
                                        if (!bacon) {
                                            const rebate = 0.10;
                                            ingredientItem.rebate = rebate;
                                        }
                                    break;
                                    case 'Queijo':
                                        const result2 = (amount / 3);
                                        if ( result2 >= 1) {
                                            const newAmount2 = Math.trunc(result2);
                                            ingredientItem.amount = newAmount2;
                                        }
                                    break;
                                    default:
                                        break;
                                }
                                return ingredientItem;
                        });
                        requestItem.ingredients = ingredientesCloned; 
                        return {
                            price: food.price,
                            amount: requestItem.amount,
                            name: food.name,
                            _id: requestItem._id,
                            ingredients: ingredientesCloned,
                        };
                    });
                    resolve(requestListCloned);
            
                });
        })
    }

    /**
     * 
     * @param {*} requestList 
     */
    calculateRequest(requestList) {
        return new Promise((resolve) => {
            let foodList = [];
            let total = 0;
            return this.retrieveAllFood()
                .then((foodList) => this.promotionFilter(requestList))
                .then((result) => {
                    const requestListFiltered = result;
                    const requestListUpdated = requestListFiltered.map((item) => {

                        let food = foodList.find((foodItem) => foodItem._id === item._id);
                        if (item.name && item.price) {
                            food = item;
                        }

                        const ingredients = food.ingredients;
                        const sumOfRebate = ingredients.reduce((a, b) => {
                            if (b.rebate) {
                                return a + b.rebate;
                            }
                            return 0;
                        },0);
                        const sumOfIngredients = ingredients.reduce((a, b) => {
                            return (a + (b.price) * b.amount);
                        }, 0);
                        let priceOfItem = (sumOfIngredients * Number(item.amount));
                        const valueOfRebate = priceOfItem * sumOfRebate;
                        priceOfItem = priceOfItem - valueOfRebate;
                        item.price = priceOfItem;
                        total = total +  priceOfItem;
                        
                        return item;
                    });
                    const request = {
                        requestList: requestListUpdated,
                    };
                    request.price = total;
                    resolve(request);
                })
        });
    }

    updateIngredientsInToRequest(ingredients, food, request) {
        return new Promise((resolve) => {
            const foodCloned = JSON.parse(JSON.stringify(food));

            const ingredientsUpdated = ingredients.map((ingredient) => {
                const referenceIngredient = food.ingredients.find((item) => item._id === ingredient._id);

                if (referenceIngredient) {
                    ingredient.amount = Number(referenceIngredient.amount) + Number(ingredient.amount);
                    ingredient.name = referenceIngredient.name;
                    ingredient.price = referenceIngredient.price;
                    food.ingredients = food.ingredients.filter((item) => item._id !== referenceIngredient._id); // removing the future duplicate objct
                    return ingredient;
                } else {
                    const newIngredientToThisFood = ingredientList.find((item) => item._id ===ingredient._id);
                    newIngredientToThisFood.amount = Number(ingredient.amount);
                    return newIngredientToThisFood;
                }
            });

            foodCloned.ingredients = food.ingredients.concat(ingredientsUpdated);
            const requestList = request.requestList;
            const requestListUpdated = requestList.map((requestItem) => {
                if (requestItem._id === foodCloned._id) {
                    return foodCloned;
                }
                return requestItem;
            })
            return this.calculateRequest(requestListUpdated)
                .then((result) => {
                    resolve(result);
            });
        })
        
    }
}

export default new ServiceMock();