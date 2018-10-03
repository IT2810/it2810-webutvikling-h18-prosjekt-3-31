import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import { AppRegistry, Button } from 'react-native';
import { View, Text } from 'native-base';
import GenerateForm from 'react-native-form-builder';

const fields = [
    {
      type: 'text',
      name: 'Appointment',
      required: true,
      label: 'Appointment',
    },
    {
      name: 'date',
      type: 'date',
      mode: 'date',
      required: true,
    },
    {
      name: 'time',
      type: 'date',
      mode: 'time',
      required: false,
    },
  ];

export default class FormScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

    newAppointment() {
      const formValues = this.FormScreen.getValues();
      console.log('FORM VALUES', formValues);
    }
    render() {
      return (
        <View style={styles.wrapper}>
          <View>
            <GenerateForm
              ref={(c) => {
                this.formGenerator = c;
              }}
              fields={fields}
            />
          </View>
          <View style={styles.Button}>
          <Button
                title="Submit"
                onPress={() => this.props.navigation.goBack()}
                />
          </View>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      marginTop: 30,
    },
    Button: {
      paddingHorizontal: 0,
      paddingTop: 20,
    }
  });

  AppRegistry.registerComponent('FormScreen', () => FormScreen);