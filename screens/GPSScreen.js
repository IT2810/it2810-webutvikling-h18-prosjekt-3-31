import React from 'react';
import { GMap } from '../components/GMap';

export default class GPSScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    return(

      <View>
          <GMap/>
      </View>
    )
  }
}
