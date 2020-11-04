import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';

const Wrapper = styled.div `
width: 350px;
margin: 0 auto;
border: black solid 1px;
background-color: #b09e99
`
const PriceSelect = styled.select `
  box-sizing: border-box;
  border-style: outset;
  font-size: 16px;
  text-align-last:center;
  width: 316px;
  margin: 5px;
  background-color: white;
  cursor: pointer;
  &:focus {
    outline: none !important;
    }
`
const Form = styled.input `
  width: 308px;
  height: 22px;
  align-self: start;
  justify-self: start;
  color: #2d333f;
  font-size: 16px;
  margin: 5px
`
const Title = styled.div `
font-size: 28px;
font-weight: bold;
margin: 10px
`
const SearchButton = styled.button `
  font-family: sans-serif;
  background-color: #64b6ac;
  font-size: 1rem;
  color: #fff;
  width: 312px;
  border: groove;
  border-radius: 2px;
  font-weight: 500;
  padding: .5rem 1rem;
  margin: 5px auto 10px auto;
  cursor: pointer;
  grid-column: 1 / span 2;
  &: active {
    outline: none
  };
  &:focus {
    outline: none !important;
    }
`
const Restaurant = styled.div `
  font-size: 24px;
  font-family: Helvetica;
  text-align: left;
  margin: auto 10px;
  cursor: pointer;
`

const AdditionalInfo = styled.div `
    font-size: 16px;
    border: gray solid 1px;
    background-color: #fad4c0;
    padding: 5px;
`

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      location: '',
      price: 2,
      top10: [],
      restaurantInfo: [false, false, false, false, false, false, false, false, false, false]
    }
  }

  handleName(e) {
    this.setState({
      term: e.target.value
    })
  }

  handlePrice(e) {
    this.setState({
      price: e.target.value
    })
  }

  handleLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  handleSearch() {
    let data = this.state;
    data.longitude = this.props.longitude
    data.latitude = this.props.latitude
    axios.get('/api/search', {
      params: data
    })
    .then(res => {
      this.setState({
        top10: res.data,
      })
    })
  }


  moreInfo(e) {
    const restaurant = this.state.top10.find((element) => element.name === e.target.innerText)
    const index = this.state.top10.findIndex((element) => element.name === e.target.innerText)
    axios.get(`/api/restaurants/${restaurant.alias}`)
    .then((res) => {
      const info = this.state.restaurantInfo;
      if (!info[index]) {
        info[index] = res.data;
        this.setState({
          restaurantInfo: info
        })
      } else {
        info[index] = false;
        this.setState({
          restaurantInfo: info
        })
      }
    })
  }

  render() {
    return (
      <div>
      <Wrapper>
       <Title>SEARCH RESTAURANTS</Title>
        <Form type="text" placeholder="Restaurant Name" onChange={this.handleName.bind(this)}></Form>
        <Form type="text" placeholder="Location" onChange={this.handleLocation.bind(this)}></Form>
        <PriceSelect value={this.state.price} onChange={this.handlePrice.bind(this)}>
            <option value={1}>$</option>
            <option value={2}>$$</option>
            <option value={3}>$$$</option>
            <option value={4}>$$$$</option>
          </PriceSelect>
        <SearchButton onClick={this.handleSearch.bind(this)}>Search</SearchButton>

        {this.state.top10.map((restaurant) => {
          const index = this.state.top10.findIndex((element) => element.alias === restaurant.alias)
            return (
              <Restaurant>
                <div onClick={this.moreInfo.bind(this)} key={restaurant.name}>{restaurant.name}</div>
                {this.state.restaurantInfo[index] ?
                  <AdditionalInfo>
                    <div>{this.state.restaurantInfo[index].location.display_address.join(', ')}</div>
                    <div>price: {this.state.restaurantInfo[index].price}</div>
                    <div>rating: {this.state.restaurantInfo[index].rating}/5</div>
                    <div>{this.state.restaurantInfo[index].hours[0].is_open_now ? 'OPEN' : 'CLOSED'}</div>
                  </AdditionalInfo> : <div></div>}
              </Restaurant>
            )
          })}
        </Wrapper>
      </div>
    )
  }
}

export default Search;