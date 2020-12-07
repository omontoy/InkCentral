import swal from 'sweetalert'
import { inkCentralServer } from '../utils/apiaxios'

const ARTIST_REGLOAD = 'ARTIST_REGLOAD'
const ARTIST_REGDONE = 'ARTIST_REGDONE'
const ARTIST_REGFAIL = 'ARTIST_REGFAIL'

const CLIENT_REGLOAD = 'CLIENT_REGLOAD'
const CLIENT_REGDONE = 'CLIENT_REGDONE'
const CLIENT_REGFAIL = 'CLIENT_REGFAIL'

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

export function regClient(email, password) {
  return async function (dispatch) {
    dispatch({ type: CLIENT_REGLOAD })
    try {
      const { data: { token } } = await inkCentralServer({
        method: 'POST',
        url: '/clients',
        data: { email, password },
      })
      localStorage.setItem('token', token)
      dispatch({ type: CLIENT_REGDONE })
    }
    catch ({ response: { data } }) {
      dispatch({ type: CLIENT_REGFAIL, payload: data.message })
      swal("Sorry", `${data.message}`, "error")
    }
  }
}

const initialState = {
  errorReg: null,
  register: false,
  loading: false
}

function registerReducer(state = initialState, action) {
  switch (action.type) {
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
    case CLIENT_REGLOAD:
      return {
        ...state,
        loading: true
      }
    case CLIENT_REGDONE:
      return {
        ...state,
        loading: false,
        register: true,
      }
    case CLIENT_REGFAIL:
      return {
        ...state,
        loading: false,
        errorReg: action.payload
      }
    default:
      return state
  }
}

export default registerReducer;