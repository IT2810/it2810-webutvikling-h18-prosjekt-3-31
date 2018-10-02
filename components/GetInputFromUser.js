import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View } from 'react-native';

export default class GetInputFromUser extends React.Component {
  
    constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  


  render() {
    return (
      <View style={{padding: 10}}>
      <Text style={{padding: 10, fontSize: 22}}>
          {'Your goal is to take \n'}
    </Text>
         <TextInput
          style={{padding: 10, height: 40}}
          placeholder="Type here to set goal!"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 18}}>
          {this.state.text.split(' ').map((word) => word).join(' ')}
          {' steps er day!\n\nYOU CAN DO IT'}
        </Text>
      </View>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => GetInputFromUser);
