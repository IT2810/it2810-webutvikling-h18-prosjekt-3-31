import React from 'react';
import { ScrollView, StyleSheet, AppRegistry, TextInput, View} from 'react-native';
import PedometerSensor from '../sensor/PedometerSensor';
import GetTextInputMultiline from '../components/GetTextInputMultiline'

export default class StepScreen extends React.Component {

    constructor(props) {
        super(props);
    }
    
    static navigationOptions = {
        title: 'Step goals',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <PedometerSensor />
        <GetTextInputMultiline/>
      </ScrollView>
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