import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div `
  width: 320px;
  border-radius: 2px;
  background-color: #fff;
  text-align: center;
  font-size: 21px;
  padding: .75rem 1rem;
  box-shadow: 0 2px 8px rgba(153,153,153,.4);
  margin: 0 auto;
`;

const FoodImage = styled.div `
  width: 300px;
  height: 300px;
  border: 1px black solid
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
          <FoodImage>Image goes here</FoodImage>
          <button>🗑</button>
          <button>🍽</button>
        </Wrapper>
      </div>
    )
  }
}

export default Container;