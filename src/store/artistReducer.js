import { inkCentralServer } from '../utils/apiaxios'

const ARTISTS_LOADING = 'ARTISTS_LOADING'
const ARTISTS_SUCCESS = 'ARTISTS_SUCCESS'
const ARTISTS_FAILURE = 'ARTISTS_FAILURE'

const ARTIST_LOADING = 'ARTIST_LOADING'
const ARTIST_SUCCESS = 'ARTIST_SUCCESS'
const ARTIST_FAILURE = 'ARTIST_FAILURE'

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

const initialState = {
  artists: [],
  artist: {},
  loading: false,
  error: null
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
    default:
      return state
  }
}

export default artistReducer;