import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import App from './index.jsx'
import Search from './components/Search.jsx'
import History from './components/History.jsx'
import HeatMap from './components/HeatMap.jsx'


const HeaderBar = styled.div `
  background-color: #c0fdfb;
  text-align: center;
  margin: 0px;
  font-family: Chalkduster, fantasy;
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
  text-decoration: none;
`

export default function AppRouter() {
  return (
    <Router>
      <div>
        <HeaderBar>
        <Link to='/search'>
          <Icon src='https://www.brywoodpta.org/wp-content/uploads/2014/07/crowd-icon.png' ></Icon>
        </Link>
          <Title>
        <Link to='/'>
          Whats For Dinner
        </Link >
          </Title>
        <Link to='/history'>
          <Icon src='https://www.greenecountyfoundation.org/wp-content/uploads/2019/09/Profile-Icon.png' ></Icon>
        </Link>
        </HeaderBar>

        <Switch>
          <Route component={App} exact path="/" >
          </Route>
          <Route component={HeatMap} path="/Search" >
          </Route>
          <Route component={History} path="/History" >
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<AppRouter />, document.getElementById('app'));
