import ingredientList from './data/ingredient-list.json';
import snackList from './data/snack-list.json';

class ServiceMock {

    retrieveAllIngredients() {
        return ingredientList;
    }

    retrieveAllSnack() {
        return snackList;
    }
}

export default new ServiceMock();