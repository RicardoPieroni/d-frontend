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

export {
    retrieveIngredientList,
    retrieveSnackList
};