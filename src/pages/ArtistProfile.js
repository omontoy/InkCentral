import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getArtist } from '../store/artistReducer';




function ArtistProfile() {
  let history = useHistory()
  let { artistId } = useParams();
  const dispatch = useDispatch()
  const { artist, error } = useSelector(
    ({artistReducer: { artist, error }})=> {
      return { artist, error }
    })
  useEffect(()=>{
    dispatch(getArtist(artistId))
  }, []);
  
  if(error) return <h1 className="main">
                      Ooops! Something went wrong with the chosen artist data request!!
                      Please login again
                    </h1>
    
  return(
    <div className='main'>
      <ul>
        <li>{artist.email}</li>
        <li>{artist.name}</li>
        <li>{artist.nickname}</li>
        <li>{artist.location}</li>
        <li>{artist.updatedAt}</li>
        <li>{artist.home}</li>
        <li>
          <img src={artist.image} alt='tattoo example'/>
        </li>
      </ul>
    </div>
  )

}
export default ArtistProfile;
