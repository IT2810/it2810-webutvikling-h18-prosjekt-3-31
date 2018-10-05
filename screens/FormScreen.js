import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import { AppRegistry } from 'react-native';
import { View, Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';
import { Font, AppLoading } from "expo";

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
        this.state = {loading: true};
        
      }

    async componentWillMount() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      });
      this.setState({ loading: false });
    }
    
    newAppointment() {
      const formValues = this.FormScreen.getValues();
      //console.log('FORM VALUES', formValues);
      return formValues;
    }

    render() {
      if (this.state.loading) {
          return (
            <View>
            <AppLoading />
          </View>
          );
        }
        return(
          <View style={styles.wrapper}>
            <View>
              <GenerateForm
                ref={(c) => {
                  this.FormScreen = c;
                }}
                fields={fields}
              />
            </View>
            <View style={styles.Button}>
            <Button block onPress={() => this.props.navigation.navigate('Calendar',{
              day: this.newAppointment()
            })
          }>
              <Text>Add Appointment</Text>
            </Button>
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