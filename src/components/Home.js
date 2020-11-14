import '../App.css';
import React, { Component } from 'react';
import { artistData } from '../artistData';
import { Artists } from './Artists'

class Home extends Component {
	state = {
		artists: artistData
	}
	render() {
    return (
      <div className="App">
        <Artists
          artists={this.state.artists}
        />        
      </div>
    );
  }
}

export default Home;