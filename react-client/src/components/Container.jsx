import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div `
  width: 600px;
  border-radius: 2px;
  background-color: #fff;
  text-align: center;
  font-size: 21px;
  padding: .75rem 1rem;
  box-shadow: 0 2px 8px rgba(153,153,153,.4);
  margin: 0 auto;
`;

const FoodImage = styled.div `
  width: 600px;
  height: 600px;
`

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Wrapper>
          <FoodImage>
            <img src={this.props.image} alt='Image Unavailable' width="600" height="600"></img>
          </FoodImage>
          <button onClick={this.props.reject}>🗑</button>
          <button onClick={this.props.accept}>🍽</button>
        </Wrapper>
      </div>
    )
  }
}

export default Container;