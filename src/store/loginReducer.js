import { inkCentralServer } from '../utils/apiaxios'

const ARTIST_LOGINLOAD = 'ARTIST_LOGINLOAD'
const ARTIST_LOGINDONE = 'ARTIST_LOGINDONE'
const ARTIST_LOGINFAIL = 'ARTIST_LOGINFAIL'

const CLIENT_LOGINLOAD = 'CLIENT_LOGINLOAD'
const CLIENT_LOGINDONE = 'CLIENT_LOGINDONE'
const CLIENT_LOGINFAIL = 'CLIENT_LOGINFAIL'
const CLEANERROR = 'CLEANERROR'

export function clientLogin( email, password ){
  return async function(dispatch){
    dispatch({ type: CLIENT_LOGINLOAD })
    try{ 
        const { data: { token } } = await inkCentralServer({
          method: 'POST',
          url: '/clients/login',    
          data: { email, password }      
        }); 
        localStorage.setItem('token', token)            
        dispatch({ type: CLIENT_LOGINDONE })                                             
    }catch({ response: {data }}){
      dispatch({ type: CLIENT_LOGINFAIL, payload: data })
    }            
  }
}
export function artistLogin( email, password){
  return async function(dispatch){
    dispatch({ type: ARTIST_LOGINLOAD })
    try{
      const { data: { token } } = await inkCentralServer({
        method: 'POST',
        url: '/artists/login', 
        data: { email, password }         
      });
      localStorage.setItem('token', token)       
      dispatch({ type: ARTIST_LOGINDONE })
    }catch({ response: { data }}){
      dispatch({ type: ARTIST_LOGINFAIL, payload: data })
    }
  }
}
export function cleanuperror(){
  return async function (dispatch){
    dispatch({ type: CLEANERROR })
  }
}
const initialState = {
  errorLog: null,
  login: false,
  loading: false
}
function loginReducer( state= initialState, action){
  switch(action.type){
    case ARTIST_LOGINLOAD:
      return {
        ...state,
        loading: true
      }
    case ARTIST_LOGINDONE:
      return {
        ...state,
        login: true,
        loading: false
      }
    case ARTIST_LOGINFAIL:
      return {
        ...state,
        loading: false,
        errorLog: action.payload
      }
    case CLIENT_LOGINLOAD:
      return {
        ...state,
        loading: true
      }
    case CLIENT_LOGINDONE:
      return {
        ...state,
        login: true,
        loading: false
      }
    case CLIENT_LOGINFAIL:
      return {
        ...state,
        loading: false,
        errorLog: action.payload
      }  
    case CLEANERROR:
      return {
        ...state,
        loading: false,
        errorLog: null
      }
    default:
      return state
  }
}
export default loginReducer;