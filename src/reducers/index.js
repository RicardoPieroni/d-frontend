import { FoodRequestReducer } from '../reducers/food-request-reducer';
import { FoodRequestListReducer } from '../reducers/food-request-list-reducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  FoodRequest: FoodRequestReducer,
  FoodRequestList: FoodRequestListReducer,
});