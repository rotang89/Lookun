import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '600px', width: '600px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDFoQRAzsKjrmCjx9HqXnF1tSpjJnrpaFc'}}
          defaultCenter={{
            lat: this.props.latitude,
            lng: this.props.longitude
          }}
          defaultZoom={13}
        >

        <Marker1 lat={this.props.restaurants[0].lat} lng={this.props.restaurants[0].long} />
        <Marker2 lat={this.props.restaurants[1].lat} lng={this.props.restaurants[1].long} />
        <Marker3 lat={this.props.restaurants[2].lat} lng={this.props.restaurants[2].long} />

          <Current
            lat={this.props.latitude}
            lng={this.props.longitude}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

const Marker1 = props => {
  return <img src="https://image.flaticon.com/icons/png/512/1532/1532718.png" width="30" height="30"></img>
}

const Marker2 = props => {
  return <img src="https://image.flaticon.com/icons/png/512/1532/1532718.png" width="30" height="30"></img>
}

const Marker3 = props => {
  return <img src="https://image.flaticon.com/icons/png/512/1532/1532718.png" width="30" height="30"></img>
}

const Current = props => {
  return <img src="https://www.flaticon.com/svg/static/icons/svg/1673/1673221.svg" width="30" height="30"></img>
}
export default SimpleMap;