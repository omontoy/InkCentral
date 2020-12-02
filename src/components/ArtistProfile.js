import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';


export class ArtistProfile extends Component {
  state = {
    email: "",
    name: ""
  }
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
        email: data.email,
        name: data.name
      })
    } 
    catch( { response: { data } }){
      swal("Sorry!!", `${data.message}`,"error")
    }
  }
    render(){
    const { email, name } = this.state 
      return(
        <div className='main'>
          <p>
            {email}
          </p>
          <p>
            {name}
          </p>
        </div>
      )
    }
  }
