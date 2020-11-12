import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';

const Wrapper = styled.div `
width: 350px;
margin: 100px auto;
border: black solid 1px;
background-color: #b09e99
`
const Title = styled.div `
font-size: 28px
`
const HistorySelect = styled.select `
  box-sizing: border-box;
  border-style: outset;
  font-size: 18px;
  text-align-last:center;
  width: 312px;
  margin: 0 0 .5rem 0;
  background-color: white;
  cursor: pointer;
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
  background-color: #d1cfcf;
  padding: 5px;
`

class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      top10: [],
      months: 1,
      restaurantInfo: [false, false, false, false, false, false, false, false, false, false]
    }
  }

  componentDidMount() {
    this.getSuggestions(1)
  }

  getSuggestions(months) {
    // months = months > 10 ? 10 : months
    let today = new Date;
    today.setMonth(today.getMonth()-months);
    let date = today.toISOString().slice(0, 10);
    axios.get('/api/history', {
      params: { date }
    })
    .then((res) => {
      this.setState({
        top10: res.data.rows
      })
    })
  }

  handleSelect(e) {
    this.getSuggestions(e.target.value)
    this.setState({
      months: e.target.value,
      restaurantInfo: [false, false, false, false, false, false, false, false, false, false]
    })
  }

  moreInfo(e) {
    const restaurant = this.state.top10.find((element) => element.restaurant === e.target.innerText)
    const index = this.state.top10.findIndex((element) => element.restaurant === e.target.innerText)
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
      <div style={{textAlign: "center"}}>
        <Wrapper>
        <Title>
          <b>YOUR TOP 10 SUGGESTIONS</b>
          <HistorySelect value={this.state.months} onChange={this.handleSelect.bind(this)}>
            <option value={1}>1 month</option>
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={12}>12 months</option>
          </HistorySelect>
        </Title>
        <div>
          {this.state.top10.map((restaurant) => {
            const index = this.state.top10.findIndex((element) => element.alias === restaurant.alias)
            return (
              <Restaurant>
                <div onClick={this.moreInfo.bind(this)} key={restaurant.restaurant}>{restaurant.restaurant}</div>
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
        </div>
        </Wrapper>
      </div>
    )
  }
}

export default History