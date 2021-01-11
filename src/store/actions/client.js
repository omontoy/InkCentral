import { inkCentralServer } from '../../utils/apiaxios'

export const CLIENT_DELLOAD = 'CLIENT_DELLOAD'
export const CLIENT_DELISOK = 'CLIENT_DELISOK'
export const CLIENT_DELFAIL = 'CLIENT_DELFAIL'

export function deleteClient(clientId) {
  return async function (dispatch) {
    dispatch({ type: CLIENT_DELLOAD })
    try {
      const token = sessionStorage.getItem('token')
      await inkCentralServer({
        method: 'DELETE',
        url: `clients/${clientId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch({ type: CLIENT_DELISOK })
    }
    catch (error) {
      if (error.response.status === 401) {
        sessionStorage.removeItem('token');
      }
      dispatch({ type: CLIENT_DELFAIL, payload: error })
    }
  }
}