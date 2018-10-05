import React from 'react';
import { MapView } from 'expo';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  render() {
    return(
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 63.43049,
          longitude: 10.39506,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

    )
  }
}
