import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'


const AnyReactComponent = ({ text }) => <div>{ text }</div>;

export default class GMap extends Component {
  static defaultProps = {
    center: { lat: 63.429722, lng: 10.393333 },
    zoom: 11
  }
render() {
    return (
      <div className='google-map'>
        <GoogleMapReact
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }>
          <AnyReactComponent
            lat={ 63.429722 }
            lng={  10.393333 }
            text={ "Where's Waldo?" }
          />
        </GoogleMapReact>
      </div>
    )
  }
}

// https://hackernoon.com/implement-google-maps-in-reactjs-5bc218074689