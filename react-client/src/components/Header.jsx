import React from 'react';
import styled from 'styled-components';

const HeaderBar = styled.div `
  background-color: #c0fdfb;
  text-align: center;
  margin: 0px;
  font-family: Chalkduster, fantasy
`

const Icon = styled.img `
  width: 60px;
  height: 60px;
  vertical-align: middle;
  margin: 5px;
  &:hover {
    cursor: pointer;
  }
`

const Title = styled.h1 `
  display: inline-block;
  width: 85%;
`

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <HeaderBar>
          <Icon src='https://cdn3.iconfinder.com/data/icons/food-delivery-1-2/100/a-20-512.png'></Icon>
          <Title>Whats For Dinner</Title>
          <Icon src='https://www.greenecountyfoundation.org/wp-content/uploads/2019/09/Profile-Icon.png'></Icon>
        </HeaderBar>
      </div>
    )
  }
}

export default Header;