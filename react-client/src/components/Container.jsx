import React from 'react';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';


const Wrapper = styled.div `
  width: 600px;
  height: 600px;
  border-radius: 2px;
  background-color: #c0fdfb;
  text-align: center;
  font-size: 21px;
  padding: .75rem 1rem;
  box-shadow: 0 2px 8px rgba(153,153,153,.4);
  margin: 10px auto;
  -webkit-box-shadow: 5px 5px 5px 0px #000000, inset 4px 4px 15px 0px #000000, -7px -12px 8px -9px rgba(249,255,220,0);
box-shadow: 5px 5px 5px 0px #000000, inset 4px 4px 15px 0px #000000, -7px -12px 8px -9px rgba(249,255,220,0);
`;

const FoodImage = styled.div `
  width: 600px;
  height: 600px;
`
const ChoiceButton = styled.button `
	box-shadow: 0px 10px 14px -7px #276873;
	background:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
	background-color:#599bb3;
	border-radius:8px;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:40px;
	font-weight:bold;
	padding:5px 15px;
  margin: 10px 100px 0px 100px;
	text-decoration:none;
	text-shadow:0px 1px 0px #3d768a;
  &: hover {
    background:linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
	background-color:#408c99;
  };
  &: active {
    outline: none
  };
  &:focus {
    outline: none !important;
    }
`
const Message = styled.div `
  font-family: Marker Felt, fantasy;
  font-size: 24px
`

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastDirection: false
    }
  }

  onSwipe(direction) {
    if (direction !== 'up' && direction !== 'down') {
      if(direction === 'left') {
        this.props.reject()
      } else {
        this.props.accept()
      }
      this.setState({
        lastDirection: direction
      })
    }
  }

  handleChoice(e) {
    this.swipe(e.target.value)
  }


  render() {
    return (
      <div>
        <Wrapper>
        {this.props.image.map((image) => {
          return(
            <TinderCard className='swipe' onSwipe={this.onSwipe.bind(this)} preventSwipe={['up', 'down']}>
          <FoodImage>
            <img src={image} alt='Image Unavailable' width="600" height="600"></img>
          </FoodImage>
        </TinderCard>
          )
        })}
        </Wrapper>
        <Message>
          {this.state.lastDirection ? <h2 className='infoText'>You swiped {this.state.lastDirection}</h2> : <h2 className='infoText'>Swipe a card to get started!</h2>}
        </Message>
      </div>
    )
  }
}

export default Container;