import React from 'react';
import { ScrollView, StyleSheet, AppRegistry, TextInput, View} from 'react-native';
import PedometerSensor from '../sensor/PedometerSensor';

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
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
        <PedometerSensor />
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


class SomeTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable = {true}
        maxLength = {40}
      />
    );
  }
}

export default class GetTextInputMultiline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Multiline Placeholder',
    };
  }

  render() {
    return (
       <SomeTextInput
         multiline = {true}
         numberOfLines = {7}
         onChangeText={(text) => this.setState({text})}
         value={this.state.text}
       />
    );
  }
}

// skip these lines if using Create React Native App
AppRegistry.registerComponent(
 'AwesomeProject',
 () => UselessTextInputMultiline
);

// src: https://docs.expo.io/versions/latest/react-native/textinput