import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import artistReducer from './artistReducer'
import registerReducer from './registerReducer'
import loginReducer from './loginReducer'
import clientReducer from './clientReducer'


const reducers = combineReducers({
  artistReducer,
  registerReducer,
  loginReducer,
  clientReducer
})
const middlewares = applyMiddleware(thunk)

export const store = createStore(reducers, middlewares)
