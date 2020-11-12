import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './components/Header.jsx';
import Container from './components/Container.jsx'
import styled from 'styled-components';
import SuggestionsModal from './components/SuggestionsModal.jsx';
import History from './components/History.jsx';
import Search from './components/Search.jsx';
import AdvancedContainer from './components/AdvancedContainer.jsx';
import UserInput from './components/UserInput.jsx';

const Message = styled.div `
  text-align: center;
  color: #d63230;
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
const HistoryWrapper = styled.div `
position: absolute;
display: inline-block;
right: 20px;
top: 100px;
`

const SearchWrapper = styled.div `
position: absolute;
display: inline-block;
left: 20px;
top: 100px;
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
      suggestions: [],
      query: []
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
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
      price: 0,
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

      results.price+=(restaurant.price ? restaurant.price.length : 0)
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
      let priceScore = 0 - Math.abs((restaurant.price ? restaurant.price.length : 0) - results.price);

      let restaurantScore = {}
      restaurantScore.score = categoryScore + priceScore
      restaurantScore.name = restaurant.name
      restaurantScore.alias = restaurant.alias
      restaurantScore.lat = restaurant.coordinates.latitude
      restaurantScore.long = restaurant.coordinates.longitude
      restaurantScore.url = restaurant.url
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

  toggleHistory() {
    this.setState({
      showHistory: !this.state.showHistory
    })
  }

  toggleSearch() {
    this.setState({
      showSearch: !this.state.showSearch
    })
  }

  SearchInput(input) {
    axios.get('/api/restaurants', {
      params: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        radius: input.radius,
        term: input.search,
        price: input.price
      }
    })
    .then((res) => {
      this.setState({
        restaurants: res.data,
        acceptedData: [],
        rejectedData: []
      })
    })
  }

  render () {
    const suggestionsModal= this.state.suggestionsModal ? <SuggestionsModal latitude={this.state.latitude} longitude={this.state.longitude} restart={this.restart.bind(this)} top3={this.state.suggestions.slice(0, 3)}/> : <div></div>
    const minimumDisplay = this.state.counter < 5 ? <Message></Message> : <SuggestionButton onClick={this.calculate.bind(this)}>Calculate Suggestions</SuggestionButton>
    const TinderContainer = this.state.restaurants.length===0 ? <div></div> : <AdvancedContainer images={this.state.restaurants.map(restaurant => {
      const data = {}
      data.url = restaurant.image_url
      data.name = restaurant.name
      return (
        data
      )
    })}/>
    return (
    <div style={{textAlign: "center"}}>
      < UserInput searchInput={this.SearchInput.bind(this)}/>
      < Container image={this.state.restaurants.length !== 0 ? this.state.restaurants.map(restaurant => restaurant.image_url) : ['https://i.pinimg.com/originals/50/7e/92/507e92e1d92210aac1a7130c8757a0dd.gif']} accept={this.handleAccept.bind(this)} reject={this.handleReject.bind(this)} current={this.state.current}/>
      {minimumDisplay}
      {suggestionsModal}
    </div>)
  }
}

export default App

