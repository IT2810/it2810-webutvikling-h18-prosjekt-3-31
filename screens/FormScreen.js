import React, {Component} from 'react';
import { StyleSheet, AppRegistry } from 'react-native';
import GenerateForm from 'react-native-form-builder';
import { Font, AppLoading } from "expo";
import { Button, View, Text } from 'native-base';

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

      //Problem with formscreen loading before fonts, causing errors
      //This loads them in and changes state afterwards, rerendering the screen
      //with the forms
    async componentWillMount() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      });
      this.setState({ loading: false });
    }
    

    // Get formvalues and return them
    newAppointment() {
      const formValues = this.FormScreen.getValues();
      //console.log('FORM VALUES', formValues);
      this.formFilled(formValues);
    }

    formFilled(formValues){
      if (formValues.date == null || formValues.time == null){
        this.props.navigation.navigate('Calendar');
      }
      else{
        this.props.navigation.navigate('Calendar',{
          day: formValues
        })
      }

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
            <Button block onPress={() => this.newAppointment()}
          >
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