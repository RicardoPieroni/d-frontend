import { FoodRequestReducer } from './../reducers/food-request-reducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  FoodRequest: FoodRequestReducer,
});