import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './components/Header.jsx';
import Container from './components/Container.jsx'
import styled from 'styled-components';
import SuggestionsModal from './components/SuggestionsModal.jsx';

const Message = styled.div `
  text-align: center;
  color: #64b6ac;
  font-size: 25px;
  margin: 15px auto;
`;

const SuggestionButton = styled.button `
  margin: 0 auto;
  background:linear-gradient(to bottom, #599bb3 5%, #64b6ac 100%);
  width: 400px;
  color: #FAD4C0;
  font-size: 30px;
  display: inline-block;
  cursor: pointer;
  &: hover {
    background:linear-gradient(to bottom, #64b6ac 5%, #599bb3 100%);
	background-color:#408c99;
  };
  &: active {
    outline: none
  };
  &:focus {
    outline: none !important;
    }
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      restaurants: [],
      current: 0,
      counter: 0,
      acceptedData: [],
      rejectedData: [],
      suggestionsModal: false,
      suggestions: []
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
        this.setState({
          restaurants: res.data
        }, () => {
          this.setState({
            //set current to random restaurant in list
            current: Math.floor(Math.random() * this.state.restaurants.length)
          })
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
          current: (this.state.current + 1) % this.state.restaurants.length,
          counter: this.state.counter+1,
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
          current: (this.state.current + 1) % this.state.restaurants.length,
          counter: this.state.counter+1,
          rejectedData: data
        })
      })
  }

  calculate() {
    const results = {
      categoryList: {},
      price: 0
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

      results.price+=(restaurant.price.length)
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
    results.price = results.price / (right.length)
    console.log(results, this.state.restaurants)
    this.findSuggestions(results)
    this.setState({
      suggestionsModal: true
    })
  }

  //
  findSuggestions(results) {
    let data = []
    for(let restaurant of this.state.restaurants) {
      //category score
      let categoryScore = 0;
      for(let category of restaurant.categories) {
        if(Object.keys(results.categoryList).includes(category.alias)) {
          categoryScore += results.categoryList[category.alias]
        }
      }
      //price score
      let priceScore = 4 - Math.abs(restaurant.price.length - results.price);

      let restaurantScore = {}
      restaurantScore.score = categoryScore + priceScore
      restaurantScore.name = restaurant.name
      restaurantScore.alias = restaurant.alias
      data.push(restaurantScore)
    }
    data.sort((a, b) => b.score - a.score)
    this.setState({
      suggestions: data
    })
  }

  restart() {
    this.setState({
      current: Math.floor(Math.random() * this.state.restaurants.length),
      counter: 0,
      acceptedData: [],
      rejectedData: [],
      suggestionsModal: false,
      suggestions: []
    })
  }

  render () {
    const suggestionsModal= this.state.suggestionsModal ? <SuggestionsModal restart={this.restart.bind(this)} top3={this.state.suggestions.slice(0, 3)}/> : <div></div>
    const minimumDisplay = this.state.counter < 1 ? <Message>We require a minimum of 5 swipes</Message> : <SuggestionButton onClick={this.calculate.bind(this)}>Calculate Suggestions</SuggestionButton>
    return (
    <div style={{textAlign: "center"}}>
      < Header />
      < Container image={this.state.restaurants.length !== 0 ? this.state.restaurants[this.state.current].image_url : 'https://media2.giphy.com/media/2uJ0EhZnMAMDe/giphy.gif'} accept={this.handleAccept.bind(this)} reject={this.handleReject.bind(this)}/>
      <br></br>
      <Message>You have swiped {this.state.counter} times.</Message>
      {minimumDisplay}
      {suggestionsModal}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));