import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './components/Header.jsx';
import Container from './components/Container.jsx'
import styled from 'styled-components';

const Message = styled.div `
  text-align: center;
  color: #64b6ac;
  font-size: 25px;
  margin: 15px auto;
`;

const SuggestionButton = styled.button `
  margin: 0 auto;
  background-color: #64b6ac;
  width: 400px;
  color: #FAD4C0;
  font-size: 30px;
  display: inline-block;

`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      restaurants: [],
      current: 0,
      acceptedData: [],
      rejectedData: []
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
        console.log(res.data)
        this.setState({
          restaurants: res.data
        })
      })
    })
  });
}

  handleAccept() {
    const data = this.state.acceptedData;
    const alias = this.state.restaurants[this.state.current].alias;
    axios.get(`/api/restaurants/${alias}`)
      .then((res) => {
        data.push(res.data)
        this.setState({
          current: this.state.current + 1,
          acceptedData: data
        })
      })
  }

  handleReject() {
    const data = this.state.rejectedData;
    const alias = this.state.restaurants[this.state.current].alias;
    axios.get(`/api/restaurants/${alias}`)
      .then((res) => {
        data.push(res.data)
        this.setState({
          current: this.state.current + 1,
          rejectedData: data
        })
      })
  }

  calculate() {
    const results = {
      categoryList: {},
      price: []
    };
    const right = this.state.acceptedData;
    const left = this.state.rejectedData;

    //analyze right swipes
    for(let restaurant of right) {
      for(let category of restaurant.categories) {
        if (!results.categoryList[category.alias]) {
          results.categoryList[category.alias] = 1
        } else {
          results.categoryList[category.alias]++
        }
      }
    }

    //analyze left swipes
    for(let restaurant of left) {
      for(let category of restaurant.categories) {
        if (!results.categoryList[category.alias]) {
          results.categoryList[category.alias] = -1
        } else {
          results.categoryList[category.alias]--
        }
      }
    }
    console.log(results.categoryList)
  }

  render () {
    const minimumDisplay = this.state.current < 0 ? <Message>We require a minimum of 20 swipes</Message> : <SuggestionButton onClick={this.calculate.bind(this)}>Calculate Suggestions</SuggestionButton>
    return (
    <div style={{textAlign: "center"}}>
      < Header />
      < Container image={this.state.restaurants.length !== 0 ? this.state.restaurants[this.state.current].image_url : 'https://media2.giphy.com/media/2uJ0EhZnMAMDe/giphy.gif'} accept={this.handleAccept.bind(this)} reject={this.handleReject.bind(this)}/>
      <br></br>
      <Message>You have swiped {this.state.current} times.</Message>
      {minimumDisplay}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));