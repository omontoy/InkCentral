import React, { Component } from 'react';
import swal from 'sweetalert';
import { inkCentralServer } from '../utils/apiaxios';


export class ArtistProfile extends Component {
  state = {
    artist: {}
  }

  async componentDidMount() {
    try {
      const token = localStorage.getItem('token')
      const response = await inkCentralServer({ 
        method: "GET",
        url: `/artists/profile/${this.props.match.params.artistId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data;          
      this.setState({
        artist: { ...data }
      })
    } 
    catch( { response: { data } }){
      swal("Sorry!!", `${data.message}`,"error")
    }
  }

  render(){

    const { email, name, location, phone, nickname, updatedAt, image } = this.state.artist
    return(
      <div className='main'>
        <ul>
          <li>{email}</li>
          <li>{name}</li>
          <li>{nickname}</li>
          <li>{location}</li>
          <li>{updatedAt}</li>
          <li>{phone}</li>
          <li>
            <img src={image} alt='tattoo example'/>
          </li>
        </ul>
      </div>
    )
  }
}