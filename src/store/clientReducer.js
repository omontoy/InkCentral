import { inkCentralServer } from '../utils/apiaxios'

const CLIENT_LOADING = 'CLIENT_LOADING'
const CLIENT_SUCCESS = 'CLIENT_SUCCESS'
const CLIENT_FAILURE = 'CLIENT_FAILURE'

const CLIENT_LOGGED_LOADING = 'CLIENT_LOGGED_LOADING'
const CLIENT_LOGGED_SUCCESS = 'CLIENT_LOGGED_SUCCESS'
const CLIENT_LOGGED_FAILED = 'CLIENT_LOGGED_FAILED'

const CLIENT_UPDATE_LOADING='CLIENT_UPDATE_LOADING'
const CLIENT_UPDATE_SUCCESS = 'CLIENT_UPDATE_SUCCESS'
const CLIENT_UPDATE_FAILED='CLIENT_UPDATE_FAILED'

const CHANGE_INPUT = 'CHANGE_INPUT'


export function getClient(clientId){
  return async function(dispatch) {
    dispatch({ type: CLIENT_LOADING })
    try {
      const token = localStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'GET',
        url: `/clients/profile/${clientId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data;
      dispatch({ type: CLIENT_SUCCESS, payload: data })
    }
    catch(error){
      dispatch({ type: CLIENT_FAILURE, payload: error })
    }
  }
}
export function getLoggedClient(){
  return async function(dispatch){
    dispatch({ type: CLIENT_LOGGED_LOADING })
    try {
      const token = localStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'GET',
        url: '/clients/profile',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data
      dispatch({ type: CLIENT_LOGGED_SUCCESS, payload: data })
    }
    catch(error){
      dispatch({ type: CLIENT_LOGGED_FAILED, payload: error })
    }
  }
}
export function updateClient(name) {
  return async function(dispatch) {
    try {
      dispatch({ type: CLIENT_UPDATE_LOADING })
      const token = localStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'PUT',
        url: '/clients/profile',
        data: { name },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { message } = response.data
      dispatch({ type: CLIENT_UPDATE_SUCCESS, payload: message })
    }
    catch(error){
      dispatch({ type: CLIENT_UPDATE_FAILED, payload: error })
    }
  }
}

export function changeInput(name, value) {
  return function(dispatch) {
    dispatch({
      type: CHANGE_INPUT,
      payload: {[name]: value}
    })
  }
}

const initialState = {
  //clients: [],
  client: {},
  loading: false,
  error: null,
  isUpdate: false
}

function clientReducer(state = initialState, action) {
  switch(action.type) {
    case CLIENT_LOADING:
      return {
        ...state
      }
    case CLIENT_SUCCESS:
      return {
        ...state,
        client: action.payload
      }
    case CLIENT_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case CLIENT_LOGGED_LOADING:
      return {
        ...state,
        loading: true
      }
    case CLIENT_LOGGED_SUCCESS:
      return {
        ...state,
        client: action.payload
      }
    case CLIENT_LOGGED_FAILED:
      return {
        ...state,
        error: action.payload
      }
    case CLIENT_UPDATE_LOADING:
      return {
        ...state,
        loading: true
      }
    case CLIENT_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdate: true
      }
    case CLIENT_UPDATE_FAILED:
      return {
        ...state,
        error: action.payload
      }
    case CHANGE_INPUT:
      return {
        ...state,
        client: action.payload
      }
    default:
      return state
  }
}

export default clientReducer;
