import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';

const Container = styled.div `
  font-family: Helvetica;
  display: grid;
  padding: 12px;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 50px 50px 50px 50px 50px;
`

const Title = styled.div `
  grid-column: 1 / span 2;
  text-align: center;
  font-family: Helvetica;
  font-size: 36px;
`

const Label = styled.div `
  border-bottom: 2px solid #64b6ac;
  font-size: 32px
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

const Restaurant = styled.div `
  font-size: 24px;
  font-family: Helventica;
  align-self: stretch;
  margin: auto 10px;
`

class SuggestionsModal extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    console.log(this.props.top3)
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
              margin: '150px auto',
              borderRadius: '5px',
              width: '744px',
              padding: '0px'
            }
          }}
        >
          <Container>
            <Title>TOP 3</Title>
            <Label>Restaurant</Label>
            <Label>Web Page</Label>
            <Restaurant>{this.props.top3[0].name}</Restaurant>
            <BookButton>More Info</BookButton>
            <Restaurant>{this.props.top3[1].name}</Restaurant>
            <BookButton>More Info</BookButton>
            <Restaurant>{this.props.top3[2].name}</Restaurant>
            <BookButton>More Info</BookButton>
          </Container>
          <button onClick={this.complete.bind(this)}>Restart</button>
        </Modal>
      </div>
    )
  }
}

export default SuggestionsModal