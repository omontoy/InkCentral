import '../App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Artists } from './Artists'

class Home extends Component {
  state = {
    artists: [],
    loading: true,
    error: null,
  }
  componentDidMount(){
    axios({
      method: 'GET',
      baseURL: 'http://localhost:8000',
      url: '/artists'      
    })
      .then(( response  ) => {
        const { data } = response.data
        this.setState({
          artists: data,
          loading: false,
        })
      })
      .catch((err) => {
        this.setState({
          error: err,
          loading: false,
        })
      })
      .finally()
  }
  render() {
    const { artists }  = this.state;
    return (
      <div className="main">
        <Artists
          artists={ artists }
        />        
      </div>
    );
  }
}

export default Home;