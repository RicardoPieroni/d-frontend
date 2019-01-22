
const initialState = {
    ingredientList: [],
    snackList: [],
    requestList: [],
    request: undefined,
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
        snackList: action.snackList,
      }
    case 'RETRIEVE_FOOD_REQUEST_DETAILS':
      return {
        ...state,
        snackList: action.snackList,
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
      }
    default:
      return state;
  }
};