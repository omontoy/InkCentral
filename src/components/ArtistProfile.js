import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';


export class ArtistProfile extends Component {
  state = {}

  async componentDidMount() {
    try {
      const token = localStorage.getItem('token')
      const response = await axios({ 
        method: "GET",
        baseURL: "http://localhost:8000",
        url: `/artists/profile/${this.props.match.params.artistId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data;     
      this.setState({ 
        ...data
      })
    } 
    catch( { response: { data } }){
      swal("Sorry!!", `${data.message}`,"error")
    }
  }

  render(){
    const { email, name, nickname, location, phone, updatedAt, image } = this.state
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
            <img src={image} alt='tattoo image'/>
          </li>
        </ul>
      </div>
    )
  }
}