import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';

const Wrapper = styled.div `
width: 400px;
margin: 0 auto;
`

class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      top10: [],
      months: 1
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
      }, () => {
        console.log(this.state.top10)
      })
    })
  }

  handleSelect(e) {
    this.getSuggestions(e.target.value)
    this.setState({
      months: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Wrapper>
        Your <b>TOP 10</b> suggestions from the past &ensp;
        <select value={this.state.months} onChange={this.handleSelect.bind(this)}>
          <option value={1}>1 month</option>
          <option value={3}>3 months</option>
          <option value={6}>6 months</option>
          <option value={12}>12 months</option>
        </select>
        <div>
          {this.state.top10.map((restaurant) => {
            return (
              <div>
                {restaurant.restaurant}
              </div>
            )
          })}
        </div>
        </Wrapper>
      </div>
    )
  }
}

export default History