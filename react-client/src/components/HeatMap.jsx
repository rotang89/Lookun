import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {google_key} from '../../../Google_API.js';
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div `
  margin: 20px auto;
  text-align:center
`

class HeatMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      suggestions: [],
      longitude: -121.9821568,
      latitude: 37.552127999999996
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, () => {
        axios.get('/api/heatmap', {
          params: {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            radius: 4000,
          }
        })
        .then((res) => {
          console.log(res.data)
          this.setState({
            suggestions: res.data
          })
        })
      })
    });
  }

  render() {
    const positions = this.state.suggestions.map((suggestion) => {
      return {lat: suggestion.coordinates.latitude, lng: suggestion.coordinates.longitude}
    })
    const heatMapData = {
      positions: positions,
      options: {
        radius: 30,
        opacity: 0.6
    }}
    return (
      // Important! Always set the container height explicitly
      <Container style={{ height: '500px', width: '800px' }}>
      <h1>Here's where everyone else is eating</h1>
      <GoogleMapReact
          bootstrapURLKeys={{
            key: google_key,
            libraries:['visualization']
          }}
          defaultCenter={{
            lat: this.state.latitude,
            lng: this.state.longitude,
          }}
          defaultZoom={13}
          heatmapLibrary={true}
          heatmap={heatMapData}
        >

        </GoogleMapReact>
      </Container>
    );
  }
}

class Marker extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <img
        src="https://image.flaticon.com/icons/png/512/1532/1532718.png"
        width="30"
        height="30">
      </img>
  )}
}

export default HeatMap;