import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import artistReducer from './artistReducer'
import registerReducer from './registerReducer'

const reducers = combineReducers({ 
  artistReducer,
  registerReducer 
})
const middlewares = applyMiddleware(thunk)

export const store = createStore(reducers, middlewares)