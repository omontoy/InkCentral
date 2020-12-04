import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import artistReducer from './artistReducer'

const reducers = combineReducers({ artistReducer })
const middlewares = applyMiddleware(thunk)

export const store = createStore(reducers, middlewares)