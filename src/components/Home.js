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
  async componentDidMount() {
    try {
      const response = await axios({
        method: 'GET',
        baseURL: 'http://localhost:8000',
        url: '/artists'
      })
      const { data } = response.data
      this.setState({
        artists: data,
        loading: false
      })
    }
    catch (err) {
      this.setState({
        loading: false,
        error: err
      })
    }
  }
  render() {
    const { artists, loading, error }  = this.state;
    if (loading) return <h1>Artists Data is still loading...</h1>
    if (error) return <h1>Something went wrong with Artists Data</h1>
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
