import React from 'react';
import {AppRegistry, StyleSheet, View, Text} from 'react-native';
// import PedometerSensor from '../sensor/PedometerSensor';
import GetInputFromUser from '../components/GetInputFromUser'


export default class StepScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          goal:50,
          text: ''};
    }

    _callback = (dataFromChild) => {
      this.setState( { goal:dataFromChild} )
    }
    

  render() {
    return (
      <View style={styles.container}>
        {/* <GetInputFromUser _callbackFromParent={this._callback} /> */}
        <Text style={styles.container}>
          "this is a test"
          </Text>
        {/* <PedometerSensor/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    
  },
});

AppRegistry.registerComponent('StepScreen', () => StepScreen);
