
const initialState = {
    ingredientList: ''
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
    default:
      return state;
  }
};