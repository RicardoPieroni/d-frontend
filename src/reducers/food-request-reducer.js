
const initialState = {
    ingredientList: [],
    foodList: [],
    requestList: [],
    request: undefined,
    ingredientsToAdd: [],
    referencedFood: undefined,
};
  
export const FoodRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RETRIEVE_ALL_INGREDIENTS':
      return {
        ...state,
        ingredientList: action.ingredientList
      };
    case 'RETRIEVE_ALL_SNACKS':
      return {
        ...state,
        foodList: action.foodList,
      }
    case 'RETRIEVE_FOOD_REQUEST_DETAILS':
      return {
        ...state,
        foodList: action.foodList,
        ingredientList: action.ingredientList,
      }
    case 'ADD_SNACK_ON_REQUEST_LIST':
      return {
        ...state,
        requestList: action.requestList,
      }
    case 'REMOVE_SNACK_FROM_REQUEST_LIST':
      return {
        ...state,
        requestList: action.requestList,
      }
    case 'ADD_REQUEST_LIST_IN_TO_REQUEST':
      return {
        ...state,
        request: action.request,
        requestList: action.requestList
      }
    case 'ADD_INGREDIENT_IN_TO_LIST':
      return {
        ...state,
        ingredientsToAdd: action.ingredientsToAdd
      }
    case 'ADD_REFERENCED_FOOD' :
      return {
        ...state,
        referencedFood: action.referencedFood,
      }
    case 'UPDATE_INGREDIENTS_FROM_REQUEST':
      return {
        ...state,
        request: action.request,
        referencedFood: action.referencedFood,
        ingredientsToAdd: action.ingredientsToAdd
      }
    case 'REMOVE_FOOD_FROM_REQUEST':
      return {
        ...state,
        request: action.request,
        referencedFood: action.referencedFood 
      }
    case 'SEND_REQUEST': 
      return {
        ...state,
        request: action.request
      }
    default:
      return state;
  }
};