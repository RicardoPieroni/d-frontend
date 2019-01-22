import ingredientList from './data/ingredient-list.json';
import snackList from './data/snack-list.json';

class ServiceMock {

    retrieveAllIngredients() {
        return ingredientList;
    }

    retrieveAllSnack() {
        return snackList;
    }

    retrieveFoodRequestDetails() {
        return {
            ingredientList,
            snackList
        }
    }

    promotionFilter(requestList) {
        let requestListCloned = JSON.parse(JSON.stringify(requestList));
        const snackListCLoned = JSON.parse(JSON.stringify(snackList));
        requestListCloned = requestListCloned.map((requestItem) => {
            const snack = snackListCLoned.find((item) => item._id === requestItem._id);
            const ingredientesCloned = snack.ingredients.map((ingredientItem) => {
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
                            const bacon = snack.ingredients.find((item) => item.name === 'Bacon');
                            if (!bacon) {
                                const rebate = 0.10;
                                const percentage = price * rebate;
                                const newPrice = price - percentage;
                                ingredientItem.price = newPrice;
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
                price: snack.price,
                amount: requestItem.amount,
                name: snack.name,
                _id: requestItem._id,
                ingredients: ingredientesCloned,
            };
        });
        return requestListCloned;
    }

    /**
     * 
     * @param {*} requestList 
     */
    calculateRequest(requestList) {
        const snackListCLoned = JSON.parse(JSON.stringify(snackList));
        let total = 0;
        const requestListFiltered = JSON.parse(JSON.stringify(this.promotionFilter(requestList)));
        const requestListUpdated = requestListFiltered.map((item) => {
            const snack = snackListCLoned.find((snackItem) => snackItem._id === item._id);
            const ingredients = snack.ingredients;
            const sumOfIngredients = ingredients.reduce((a, b) => {
                return a + b.price
            }, 0);
            total = (total + (sumOfIngredients * Number(item.amount)));
            item.price = sumOfIngredients * Number(item.amount);
            return item;
        });
        const request = {
            requestList: requestListUpdated,
        };
        request.price = total;
        return request;
    }
}

export default new ServiceMock();