
const initialState = {
    requestList: [],
    referencedRequest: undefined,
};

export const FoodRequestListReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'RETRIEVE_ALL_REQUESTS':
        return {
          ...state,
          requests: action.requests
        };
      case 'SET_REFERENCED_REQUEST':
        return {
          ...state,
          referencedRequest: action.referencedRequest,
        }
      case 'UPDATE_REQUEST':
        return {
          ...state,
          referencedRequest: action.referencedRequest,
          requests: action.requests
        }
    default:
      return state;
  }
};