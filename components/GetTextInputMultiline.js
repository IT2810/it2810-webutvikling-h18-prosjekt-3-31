import { AppRegistry, TextInput} from 'react-native';
import React from 'react';


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