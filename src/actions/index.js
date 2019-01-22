import serviceHandle from './../services/service-handle';

const service = serviceHandle.retrieveService()
const retrieveIngredientList = () => {
    const ingredientList = service.retrieveAllIngredients();
    return {
        type: 'RETRIEVE_ALL_INGREDIENTS',
        ingredientList,
    }
};

const retrieveSnackList = () => {
    const snackList = service.retrieveAllSnack();
    return {
        type: 'RETRIEVE_ALL_SNACKS',
        snackList,
    }
};

const retrieveFoodRequestDetails = () => {
    const ingredientList = service.retrieveAllIngredients();
    const snackList = service.retrieveAllSnack();
    return {
        type: 'RETRIEVE_FOOD_REQUEST_DETAILS',
        snackList,
        ingredientList,
    }
}

const removeSnackFromRequestList = (requestList, snackTO) => {
    const { _id } = snackTO;
    const requestListClone = JSON.parse(JSON.stringify(requestList));

    return {
        type: 'REMOVE_SNACK_FROM_REQUEST_LIST',
        requestList: requestListClone.filter((item) => item._id !== _id),
    }
}

const addSnackOnRequestList = (requestList, snackTO) => {
    let requestListClone = JSON.parse(JSON.stringify(requestList));
    const { _id, amount } = snackTO;
    const snack = requestListClone.find((item) => item._id === _id);
    if (!snack) {
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
    const request = service.calculateRequest(requestList);
    return {
        type: 'ADD_REQUEST_LIST_IN_TO_REQUEST',
        request: request,
    }
}

export {
    retrieveIngredientList,
    retrieveSnackList,
    retrieveFoodRequestDetails,
    addSnackOnRequestList,
    removeSnackFromRequestList,
    addRequestListInToRequest
};