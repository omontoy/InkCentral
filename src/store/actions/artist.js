import { inkCentralServer } from '../../utils/apiaxios'

export const ARTIST_DELLOAD = 'ARTIST_DELLOAD'
export const ARTIST_DELISOK = 'ARTIST_DELISOK'
export const ARTIST_DELFAIL = 'ARTIST_DELFAIL'

export function deleteArtist(artistId) {
  return async function (dispatch) {
    dispatch({ type: ARTIST_DELLOAD })
    try {
      const token = sessionStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'DELETE',
        url: `/artists/${artistId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { message } = response.data;
      dispatch({ type: ARTIST_DELISOK, payload: message })
    }
    catch (error) {
      if (error.response.status === 401) {
        sessionStorage.removeItem('token');
      }
      dispatch({ type: ARTIST_DELFAIL, payload: error })
    }
  }
}