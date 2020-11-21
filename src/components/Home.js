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
      .then(( {data}  ) => {
        this.setState({
          artists: data.data,
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
    return (
      <div className="main">
        <Artists
          artists={this.state.artists}
        />        
      </div>
    );
  }
}

export default Home;