import { dateOfComment } from '../utils/dates'
import { format } from 'timeago.js'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { deleteComment } from '../store/actions/comment'
import { getArtist } from '../store/artistReducer'
import swal from 'sweetalert';
import jwt_decode from "jwt-decode";

export function Comment({ id, note, from, date }) {

  const dateComment = dateOfComment(date)

  const dispatch = useDispatch()

  const { userType } = useSelector(
    ({ loginReducer: { userType } }) => {
      return { userType }
    })

  const { userTypeR } = useSelector(
    ({ registerReducer: { userTypeR } }) => {
      return { userTypeR }
    })

  let user = userType || userTypeR

  const { artistId } = useParams()

  const delComment = (id) => {
    
    const token = sessionStorage.getItem('token')
    const decoded = jwt_decode(token); 

    if(user === 'client' && decoded.id === from._id) {
      swal({
        title: "Are you sure to delete your comment?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(async(willDelete) => {
        if(willDelete) {
          await dispatch(deleteComment(id))
          dispatch(getArtist(artistId))
        } else {
          swal("Your comments are safe here")
        }
      })
    }
  }

  return (
    <div className="media mb-3" onDoubleClick={() => delComment(id)}>
      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">
          {format(date)} {`(${dateComment[0]} ${dateComment[1]} ${dateComment[2]})`} 
        </small>
        { from.name ? (
          <h6 className="mt-0 mb-1 text-muted">{from.name}</h6> 
          ) : (
            <h6 className="mt-0 mb-1 text-muted">{from.email}</h6>
          )
        }
        {note}
      </div>
    </div>
  )
}