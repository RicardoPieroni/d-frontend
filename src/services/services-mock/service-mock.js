import Promise from 'bluebird';
import ingredientList from './data/ingredient-list.json';
import foodList from './data/food-list.json';
import requestList from './data/request-list.json';
import moment from 'moment';
import Chance from 'chance';

const chanceInstance = new Chance();

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

    promotionFilter(requestListTO) {
    return this.retrieveAllFood()
        .then((result) => {
            const foodList = result;
            const requestListUpdated = requestListTO.map((requestItem) => {
                let food = foodList.find((item) => item._id === requestItem._id);
                if (requestItem.name && requestItem.price) {
                    food = requestItem;
                }
                const ingredientesCloned = food.ingredients.map((ingredientItem) => {
                        const ingredientCloned = JSON.parse(JSON.stringify(ingredientItem));
                        const { amount, name } = ingredientCloned;
                        switch (name) {
                            case 'Hambúrguer de carne':
                                const result = (amount / 3);
                                if (result >= 1){
                                    const newAmount = amount - Math.trunc(result);
                                    ingredientCloned.amount = newAmount;
                                }
                            break;
                            case 'Alface':
                                const bacon = food.ingredients.find((item) => item.name === 'Bacon');
                                if (!bacon) {
                                    const rebate = 0.10;
                                    ingredientCloned.rebate = rebate;
                                }
                            break;
                            case 'Queijo':
                                const result2 = (amount / 3);
                                if ( result2 >= 1) {
                                    const newAmount2 = amount - Math.trunc(result2);
                                    ingredientCloned.amount = newAmount2;
                                }
                            break;
                            default:
                                break;
                        }
                        return ingredientCloned;
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
            return Promise.resolve(requestListUpdated);
    
        });
    }

    /**
     * 
     * @param {*} requestList 
     */
    calculateRequest(requestListTO) {
        return new Promise((resolve) => {
            let foodList = [];
            let total = 0;
            return this.retrieveAllFood()
                .then((result) => {
                    foodList = result;
                    return this.promotionFilter(requestListTO);
                })
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
        return this.retrieveAllIngredients()
            .then((ingredientsResult) => {
                const foodCloned = JSON.parse(JSON.stringify(food));

                const ingredientsUpdated = ingredients.map((ingredient) => {
                    const referenceIngredient = food.ingredients.find((item) => item._id === ingredient._id);

                    if (referenceIngredient) {
                        const amount = Number(referenceIngredient.amount) + Number(ingredient.amount);
                        const name = referenceIngredient.name;
                        const price = referenceIngredient.price;
                        foodCloned.ingredients = foodCloned.ingredients.filter((item) => item._id !== referenceIngredient._id); // removing the future duplicate objct

                        return {
                            amount,
                            name,
                            price,
                            _id: referenceIngredient._id
                        };
                    } else {
                        const newIngredientToFood = ingredientsResult.find((item) => item._id ===ingredient._id);
                        newIngredientToFood.amount = Number(ingredient.amount);
                        return newIngredientToFood;
                    }
                });

                foodCloned.ingredients = foodCloned.ingredients.concat(ingredientsUpdated);
                const requestList = request.requestList;
                const requestListUpdated = requestList.map((requestItem) => {
                    if (requestItem._id === foodCloned._id) {
                        return foodCloned;
                    }
                    return requestItem;
                })
                return this.calculateRequest(requestListUpdated)
                    .then((result) => {
                        return Promise.resolve(result);
                });
        })
    }

    retrieveAllRequests() {
        return new Promise((resolve) => {
            resolve(requestList);
        })
    }

    updateStatusOfRequest(requestTO) {
        return new Promise((resolve) => {
            return this.retrieveAllRequests()
                .then((requestList) => {
                    const requestListUpdated = requestList.map((item) => {
                        if (item._id === requestTO._id) {
                            item.status = 'cancelado' ;
                        }
                        return item;
                    });
                    return resolve(requestListUpdated);
                });
        })
    }

    createRequest(requestTO) {
        return new Promise((resolve) => {
            return this.retrieveAllRequests()
                .then((requestList) => {
                    requestTO.status = 'ativo';
                    requestTO._id = chanceInstance.string({ length: 24, pool: '0123456789' });
                    requestTO.requestDate = moment();
                    requestTO.number = chanceInstance.integer({ min: 0, max: 1000 });
                    requestList.push(requestTO);
                    resolve();
            });
        });
    }
}

export default new ServiceMock();