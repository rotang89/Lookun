import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';
import SimpleMap from './Map.jsx'


const Container = styled.div `
  font-family: Helvetica;
  display: grid;
  padding: 12px;
  grid-template-columns: 3fr 1fr;
  grid-auto-rows: minmax(50px, auto);
`
const Title = styled.div `
  grid-column: 1 / span 2;
  text-align: center;
  font-family: Helvetica;
  font-size: 36px;
  border-bottom: 2px solid #64b6ac;
`
const Label = styled.div `
  border-bottom: 2px solid #64b6ac;
  font-size: 32px
`
const RestartButton = styled.button `
  box-shadow:inset 3px 4px 0px 0px #54a3f7;
	background:linear-gradient(to bottom, #007dc1 5%, #0061a7 100%);
	background-color:#007dc1;
	border-radius:10px;
	border:1px solid #124d77;
	display:block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:28px;
	padding:7px 25px;
	text-decoration:none;
	text-shadow:0px 1px 2px #154682;
  width: 50%;
  margin: 20px auto;
  &: hover {
    background:linear-gradient(to bottom, #0061a7 5%, #007dc1 100%);
	background-color:#0061a7;
	background-color:#408c99;
  };
  &: active {
    outline: none
  };
  &:focus {
    outline: none !important;
    }
`
const BookButton = styled.button `
box-shadow: 3px 4px 0px 0px #8a2a21;
	background:linear-gradient(to bottom, #c62d1f 5%, #f24437 100%);
	background-color:#c62d1f;
	border-radius:18px;
	border:1px solid #d02718;
  display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
  padding:7px 25px;
	text-decoration:none;
  text-shadow:0px 1px 0px #810e05;
  place-self: center;
  &: active {
    outline: none
  };
  &:focus {
    outline: none !important;
    }
`
const AdditionalInfo = styled.div `
    font-size: 16px;
    border: gray solid 1px;
`
const Restaurant = styled.div `
  font-size: 24px;
  font-family: Helvetica;
  align-self: stretch;
  margin: auto 10px;
`

class SuggestionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantInfo: [false, false, false]
    }
  }

  complete() {
    const self = this
    axios.post('/api/restaurants/suggestions', {
      suggestions: self.props.top3
    })
    .then((response) => {
      self.props.restart()
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  moreInfo(e) {
    const index = e.target.value;
    axios.get(`/api/restaurants/${this.props.top3[index].alias}`)
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
    const moreInfo0 = this.state.restaurantInfo[0] ?
    <AdditionalInfo>
      <div>{this.state.restaurantInfo[0].location.display_address.join(', ')}</div>
      <div>price: {this.state.restaurantInfo[0].price}</div>
      <div>rating: {this.state.restaurantInfo[0].rating}/5</div>
      <div>{this.state.restaurantInfo[0].hours[0].is_open_now ? 'OPEN' : 'CLOSED'}</div>
    </AdditionalInfo> : <div></div>
    const moreInfo1 = this.state.restaurantInfo[1] ?
    <AdditionalInfo>
      <div>{this.state.restaurantInfo[1].location.display_address.join(', ')}</div>
      <div>price: {this.state.restaurantInfo[1].price}</div>
      <div>rating: {this.state.restaurantInfo[1].rating}/5</div>
      <div>{this.state.restaurantInfo[1].hours[0].is_open_now ? 'OPEN' : 'CLOSED'}</div>
    </AdditionalInfo> : <div></div>
    const moreInfo2 = this.state.restaurantInfo[2] ?
    <AdditionalInfo>
      <div>{this.state.restaurantInfo[2].location.display_address.join(', ')}</div>
      <div>price: {this.state.restaurantInfo[2].price}</div>
      <div>rating: {this.state.restaurantInfo[2].rating}/5</div>
      <div>{this.state.restaurantInfo[2].hours[0].is_open_now ? 'OPEN' : 'CLOSED'}</div>
    </AdditionalInfo> : <div></div>

    return (
      <div>
        <Modal
          ariaHideApp={false}
          isOpen={true}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, .9)'
            },
            content: {
              margin: '120px auto 100px auto',
              borderRadius: '5px',
              width: '800px',
              padding: '0px'
            }
          }}
        >
          <Container>
            <Title>TOP 3 Nearby Restaurants</Title>

            <Restaurant>{this.props.top3[0].name} {moreInfo0}</Restaurant>
            <BookButton value={0} onClick={this.moreInfo.bind(this)}>{this.state.restaurantInfo[0] ? 'Less Info' : 'More Info'}</BookButton>
            <Restaurant>{this.props.top3[1].name} {moreInfo1}</Restaurant>
            <BookButton value={1} onClick={this.moreInfo.bind(this)}>{this.state.restaurantInfo[1] ? 'Less Info' : 'More Info'}</BookButton>
            <Restaurant>{this.props.top3[2].name} {moreInfo2}</Restaurant>
            <BookButton value={2} onClick={this.moreInfo.bind(this)}>{this.state.restaurantInfo[2] ? 'Less Info' : 'More Info'}</BookButton>
          </Container>
          <RestartButton onClick={this.complete.bind(this)}>COMPLETE</RestartButton>
          <SimpleMap latitude={this.props.latitude} longitude={this.props.longitude} restaurants={this.props.top3}/>
        </Modal>
      </div>
    )
  }
}

export default SuggestionsModal