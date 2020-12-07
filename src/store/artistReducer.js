import swal from 'sweetalert'
import { inkCentralServer } from '../utils/apiaxios'

const ARTIST_LOADING = 'ARTIST_LOADING'
const ARTIST_SUCCESS = 'ARTIST_SUCCESS'
const ARTIST_FAILURE = 'ARTIST_FAILURE'

const ARTIST_REGLOAD = 'ARTIST_REGLOAD'
const ARTIST_REGDONE = 'ARTIST_REGDONE'
const ARTIST_REGFAIL = 'ARTIST_REGFAIL'

export function getArtists() {
  return async function (dispatch) {
    dispatch({ type: ARTIST_LOADING })
    try {
      const response = await inkCentralServer({
        method: 'GET',
        url: '/artists'
      })
      const { data } = response.data
      dispatch({ type: ARTIST_SUCCESS, payload: data })
    }
    catch (error) {
      dispatch({ type: ARTIST_FAILURE, payload: error })
    }
  }
}

export function regArtist(email, password) {
  return async function (dispatch) {
    dispatch({ type: ARTIST_REGLOAD })
    try {
      const { data: { token } } = await inkCentralServer({
        method: 'POST',
        url: '/artists',
        data: { email, password },
      })
      localStorage.setItem('token', token)
      dispatch({ type: ARTIST_REGDONE })      
    }
    catch ({ response: { data } }) {
      dispatch({ type: ARTIST_REGFAIL, payload: data.message })
      swal("Sorry", `${data.message}`, "error")
    }
  }
}

const initialState = {
  artists: [],
  loading: false,
  error: null,
  errorReg: null,
  register: false,
}

function artistReducer(state = initialState, action) {
  switch (action.type) {
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
    case ARTIST_REGLOAD:
      return {
        ...state,
        loading: true
      }
    case ARTIST_REGDONE:
      return {
        ...state,
        loading: false,
        register: true,
      }
    case ARTIST_REGFAIL:
      return {
        ...state,
        loading: false,
        errorReg: action.payload
      }
    default:
      return state
  }
}

export default artistReducer;