import React from 'react';
import styled from 'styled-components';

const HeaderBar = styled.div `
  background-color: #c0fdfb;
  text-align: center
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
          <h1>Whats For Dinner</h1>
        </HeaderBar>
      </div>
    )
  }
}

export default Header;