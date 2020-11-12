import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {google_key} from '../../../Google_API.js';

class SimpleMap extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '800px', width: '800px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: google_key}}
          defaultCenter={{
            lat: this.props.latitude,
            lng: this.props.longitude
          }}
          defaultZoom={13}
        >

        {this.props.restaurants.map(restaurant => (
          <Marker url={restaurant.url} lat={restaurant.lat} lng={restaurant.long} name={restaurant.name} />
        ))}


          <Current
            lat={this.props.latitude}
            lng={this.props.longitude}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

class Marker extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      showDetails: false
    }
  }

  toggleDetails() {
    this.setState({
      showDetails: !this.state.showDetails
    })
  }

  render() {
  const name = this.state.showDetails ? <div>{this.props.name}</div> : <div></div>
    return (
    <a href={this.props.url} target="_blank">
      <img
        onMouseEnter={this.toggleDetails.bind(this)}
        onMouseLeave={this.toggleDetails.bind(this)}
        src="https://image.flaticon.com/icons/png/512/1532/1532718.png"
        width="30"
        height="30">
      </img>
      {name}
    </a>
  )}
}

const Current = props => {
  return <img src="https://www.flaticon.com/svg/static/icons/svg/1673/1673221.svg" width="30" height="30"></img>
}
export default SimpleMap;