import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Reducers } from '../reducers';

export const Store = createStore(Reducers,
    compose(applyMiddleware(thunk))
);