import Promise from 'bluebird';
import serviceHandle from './../services/service-handle';

const service = serviceHandle.retrieveService()
const retrieveIngredientList = () => {
    return dispatch => { 
        return service.retrieveAllIngredients()
            .then((result) => {

                dispatch({
                    type: 'RETRIEVE_ALL_INGREDIENTS',
                    ingredientList: result,
                });
        });
    }
};

const retrieveFoodList = () => {
    return dispatch => { 
        return service.retrieveAllFood()
            .then((result) => {
                dispatch({
                    type: 'RETRIEVE_ALL_SNACKS',
                    foodList: result,
                });
            });
    }
};

const retrieveFoodRequestDetails = () => {
    return dispatch => {
        return Promise.all([
            service.retrieveAllIngredients(),
            service.retrieveAllFood()
        ]).then((result) => {
            dispatch({
                type: 'RETRIEVE_FOOD_REQUEST_DETAILS',
                ingredientList: result[0],
                foodList: result[1],
            });
        })
    }

}

const removeFoodFromRequestList = (requestList, foodTO) => {
    const { _id } = foodTO;
    const requestListClone = JSON.parse(JSON.stringify(requestList));

    return {
        type: 'REMOVE_SNACK_FROM_REQUEST_LIST',
        requestList: requestListClone.filter((item) => item._id !== _id),
    }
}

const addFoodOnRequestList = (requestList, foodTO) => {
    let requestListClone = JSON.parse(JSON.stringify(requestList));
    const { _id, amount } = foodTO;
    const food = requestListClone.find((item) => item._id === _id);
    if (!food) {
        requestListClone.push({
            _id,
            amount: amount ? amount : null,
        });
    } else {
        requestListClone = requestListClone.map((item) => {
            if(item._id === _id && amount) {
                item.amount = amount;
                return item;
            }
            return item;
        })
    }
    
    return {
        type: 'ADD_SNACK_ON_REQUEST_LIST',
        requestList: requestListClone,
    }
}

const addRequestListInToRequest = (requestList) => {
    return dispatch => {
        return service.calculateRequest(requestList)
            .then((result) => {
                dispatch({
                    type: 'ADD_REQUEST_LIST_IN_TO_REQUEST',
                    request: result,
                    requestList: [],
                });
            });
    }
}

const addIngredientInToFood = (ingredientsToAdd, ingredient) => {
    let list = JSON.parse(JSON.stringify(ingredientsToAdd));

    const ingredientFound = list.find((item) => ingredient._id === item._id);

    if (ingredientFound) {
        list = list.map((item) => {
            if (item._id === ingredient._id) {
                item.amount = ingredient.amount;
            }
            return item;
        })
    } else {
        list.push(ingredient);
    }

    return {
        type: 'ADD_INGREDIENT_IN_TO_LIST',
        ingredientsToAdd: list,
    }
}

const addReferencedFood = (food) => {
    return {
        type: 'ADD_REFERENCED_FOOD',
        referencedFood: food,
    }
}

const updateIngredientsFromRequest = (ingredients, food, request) => {
    return dispatch => {
        return service.updateIngredientsInToRequest(ingredients, food, request)
            .then((result) => {
                 dispatch({
                    type: 'UPDATE_INGREDIENTS_FROM_REQUEST',
                    request: result,
                    ingredientsToAdd: [],
                    referencedFood: undefined,
                });
            });
    }
}
const removeFoodFromRequest = (request, food) => {
    const { requestList } = request;
    const requestListUpdated = requestList.filter((item) => item._id !== food._id);
    return dispatch => {
        return service.calculateRequest(requestListUpdated)
            .then((result) => {
                dispatch(
                    {
                        type: 'REMOVE_FOOD_FROM_REQUEST',
                        request: result,
                        referencedFood: undefined,
                    });
            });
    }
}

const retrieveAllRequests = () => {
    return dispatch => {
        return service.retrieveAllRequests()
            .then((result) => {
                dispatch(
                    {
                        type: 'RETRIEVE_ALL_REQUESTS',
                        requests: result,
                    });
            });
    }
}

const setReferencedRequest = (request) => {
    return {
        type: 'SET_REFERENCED_REQUEST',
        referencedRequest: request,
    }
}

const updateStatusOfRequest = (referencedRequest) => {
    return dispatch => {
        return service.updateStatusOfRequest(referencedRequest)
            .then((result) => {
                dispatch(
                    {
                        type: 'UPDATE_REQUEST',
                        requests: result,
                        referencedRequest: undefined,
                    });
            })
    }
}

const createRequest = (request) => {
    return dispatch => {
        return service.createRequest(request)
            .then((result) => {
                dispatch(
                    {
                        type: 'SEND_REQUEST',
                        request: result,
                    });
            })
    }
}

export {
    retrieveIngredientList,
    retrieveFoodList,
    retrieveFoodRequestDetails,
    addFoodOnRequestList,
    removeFoodFromRequestList,
    addRequestListInToRequest,
    addIngredientInToFood,
    addReferencedFood,
    updateIngredientsFromRequest,
    removeFoodFromRequest,
    retrieveAllRequests,
    setReferencedRequest,
    updateStatusOfRequest,
    createRequest
};