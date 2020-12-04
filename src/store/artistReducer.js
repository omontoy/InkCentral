import { inkCentralServer } from '../utils/apiaxios'

const ARTIST_LOADING = 'ARTIST_LOADING'
const ARTIST_SUCCESS = 'ARTIST_SUCCESS'
const ARTIST_FAILURE = 'ARTIST_FAILURE'

export function getArtists() {
  return async function(dispatch) {  
    dispatch({ type: ARTIST_LOADING })  
    try {
      const response = await inkCentralServer({
        method: 'GET',
        url: '/artists'
      })
      const { data } = response.data
      dispatch({ type: ARTIST_SUCCESS, payload: data })
    }
    catch(error) {
      dispatch({ type: ARTIST_FAILURE, payload: error })
    }
  }
}

const initialState = {
  artists: [],
  loading: false,
  error: null
}

function artistReducer(state = initialState, action) {
  switch(action.type) {
    case ARTIST_LOADING:
      return {
        ...state,
        loading: true
      }
    case ARTIST_SUCCESS:
      return {
        ...state,
        artists: action.payload,
        loading: false
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