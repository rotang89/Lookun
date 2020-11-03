import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div `
  width: 600px;
  border-radius: 2px;
  background-color: #b09e99;
  text-align: center;
  font-size: 21px;
  padding: .75rem 1rem;
  box-shadow: 0 2px 8px rgba(153,153,153,.4);
  margin: 10px auto;
`;

const FoodImage = styled.div `
  width: 600px;
  height: 600px;
`

const FoodImage2 = styled.div `
  width: 600px;
  height: 600px;
  position: fixed;
  z-index: -1
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

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animation: false
    }
  }

  render() {
    return (
      <div>
        <Wrapper>
          <FoodImage>
            <img src={this.props.image} alt='Image Unavailable' width="600" height="600"></img>
          </FoodImage>
          <ChoiceButton onClick={this.props.reject}>🗑</ChoiceButton>
          <ChoiceButton onClick={this.props.accept}>🍽</ChoiceButton>
        </Wrapper>
      </div>
    )
  }
}

export default Container;