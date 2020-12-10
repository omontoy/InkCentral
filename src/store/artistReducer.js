import { inkCentralServer } from '../utils/apiaxios'

const ARTISTS_LOADING = 'ARTISTS_LOADING'
const ARTISTS_SUCCESS = 'ARTISTS_SUCCESS'
const ARTISTS_FAILURE = 'ARTISTS_FAILURE'

const ARTIST_LOADING = 'ARTIST_LOADING'
const ARTIST_SUCCESS = 'ARTIST_SUCCESS'
const ARTIST_FAILURE = 'ARTIST_FAILURE'

const ARTIST_LOGGED_LOADING = 'ARTIST_LOGGED_LOADING'
const ARTIST_LOGGED_SUCCESS = 'ARTIST_LOGGED_SUCCESS'
const ARTIST_LOGGED_FAILED = 'ARTIST_LOGGED_FAILED'

const ARTIST_UPDATE_LOADING='ARTIST_UPDATE_LOADING'
const ARTIST_UPDATE_SUCCESS = 'ARTIST_UPDATE_SUCCESS'
const ARTIST_UPDATE_FAILED='ARTIST_UPDATE_FAILED'
const CHANGE_INPUT='CHANGE_INPUT'

export function getArtists() {
  return async function(dispatch) {  
    dispatch({ type: ARTISTS_LOADING })  
    try {
      const response = await inkCentralServer({
        method: 'GET',
        url: '/artists'
      })
      const { data } = response.data
      dispatch({ type: ARTISTS_SUCCESS, payload: data })
    }
    catch(error) {
      dispatch({ type: ARTISTS_FAILURE, payload: error })
    }
  }
}

export function getArtist(artistId){
  return async function(dispatch) {
    dispatch({ type: ARTIST_LOADING })
    try {
      const token = localStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'GET',
        url: `/artists/profile/${artistId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data;
      dispatch({ type: ARTIST_SUCCESS, payload: data })
    }
    catch(error){
      dispatch({ type: ARTISTS_FAILURE, payload: error })
    }
  }
}
export function getLoggedArtist(){
  return async function(dispatch){
    dispatch({ type: ARTIST_LOGGED_LOADING })
    try {
      const token = localStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'GET',
        url: '/artists/profile',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data
      dispatch({ type: ARTIST_LOGGED_SUCCESS, payload: data })
    }
    catch(error){
      dispatch({ type: ARTIST_LOGGED_FAILED, payload: error })
    }
  }
}
export function updateArtist(name, nickname, phone, location){
  return async function(dispatch) {
    try {
      dispatch({ type: ARTIST_UPDATE_LOADING })
      const token = localStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'PUT',
        url: '/artists/profile',
        data: { name, nickname, location, phone },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { message } = response.data
      dispatch({ type: ARTIST_UPDATE_SUCCESS, payload: message })
    }
    catch(error){
      dispatch({ type: ARTIST_UPDATE_FAILED, payload: error })
    }
  }
}
export function changeInput(name, value){
  return function (dispatch){
    dispatch({
      type: CHANGE_INPUT,
      payload: {[name]: value }
    })
  }

}


const initialState = {
  artists: [],
  artist: {},
  loading: false,
  error: null,
  isUpdate: false
}

function artistReducer(state = initialState, action) {
  switch(action.type) {
    case ARTISTS_LOADING:
      return {
        ...state,
        loading: true
      }
    case ARTIST_LOADING:
      return {
        ...state
      }
    case ARTISTS_SUCCESS:
      return {
        ...state,
        artists: action.payload,
        loading: false
      }
    case ARTIST_SUCCESS:
      return {
        ...state,
        artist: action.payload
      }
    case ARTISTS_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case ARTIST_FAILURE:
      return {
        ...state,
        error: action.payload
      }    
    case ARTIST_LOGGED_LOADING:
      return {
        ...state,
        loading: true
      }
    case ARTIST_LOGGED_SUCCESS:
      return {
        ...state,
        artist: action.payload
      }
    case ARTIST_LOGGED_FAILED:
      return {
        ...state,
        error: action.payload
      }
    case ARTIST_UPDATE_LOADING:
      return {
        ...state,
        loading: true
      }
    case ARTIST_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdate: true
      }
    case ARTIST_UPDATE_FAILED:
      return {
        ...state,
        error: action.payload
      }
    case CHANGE_INPUT:
      return {
        ...state,
        artist: action.payload
      }
    default:
      return state
  }
}

export default artistReducer;