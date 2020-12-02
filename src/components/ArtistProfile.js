import React, { Component } from 'react';


export class ArtistProfile extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token')
  
  }

    render(){
      console.log(this.props);
      return(
        <div>
             <h1 style={{ marginTop: "400px"}}>
               Hola Mundo
             </h1>
        </div>
      )
    }
  }
  
