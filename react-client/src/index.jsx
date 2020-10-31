import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './components/Header.jsx';
import Container from './components/Container.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      restaurants: []
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, () => {
      axios.get('/api/restaurants', {
        params: {
          latitude: this.state.latitude,
          longitude: this.state.longitude
        }
      })
      .then((res) => {
        console.log(res)
      })
    })
  });

  }

  render () {
    return (<div>
      < Header />
      < Container />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));