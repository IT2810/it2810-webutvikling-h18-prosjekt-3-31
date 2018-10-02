import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { AppRegistry } from 'react-native';
import { View, Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';

const fields = [
  {
    type: 'text',
    name: 'Appointment',
    required: true,
    label: 'Appointment',
  },
  {
    type: 'date',
    name: 'date',
    icon: 'ios-date',
    required: true,
    label: 'Date',
  },
  {
    type: 'time',
    name: 'time',
    icon: 'ios-time',
    required: false,
    label: 'Time',
  }
];

const appointment1 = {"appointment": "Hello there person",
                    "dateString": "2017-05-16",
                    "day": 2,
                    "month": 10,
                    "timestamp": 1538478110000,
                    "year": 2018
                    };
const appointment2 = {"appointment": "WHAT!?",
                    "dateString": "2017-05-20",
                    "day": 20,
                    "month": 10,
                    "timestamp": 1539687710000,
                    "year": 2018
                    };
const appointment3 = {"appointment": "WHAT!?",
                    "dateString": "2017-05-10",
                    "day": 10,
                    "month": 10,
                    "timestamp": 1539174795000,
                    "year": 2018
                    };
const appointment4 = {"appointment": "WHAT!?",
                    "dateString": "2017-05-07",
                    "day": 7,
                    "month": 10,
                    "timestamp": 1538915595000,
                    "year": 2018
                    };


export default class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {items: {}};
    this.addItems.bind(this)
    
  }

  componentWillMount(){
    this.addItems(appointment1);
    this.addItems(appointment2);
    this.addItems(appointment3);
    this.addItems(appointment4);
}

  render() {
    return (
      <View>
      <ScrollView style={styles.container}>
        
        <Agenda style={styles.Agenda}
        items={this.state.items}
        selected={'2018-10-03'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        loadItemsForMonth={this.loadItems.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        theme={{
          agendaTodayColor: 'red'
        }}
      />
         
      </ScrollView>
      <Button
        title="Sign Up!"
        onPress={FormGenerator}
      />
        
      </View>
    );
  }

/*
    Day is an object on the form
    Object {
      "appointment": "Hello there person",
      "dateString": "2017-05-16",
      "day": 16,
      "month": 5,
      "timestamp": 1494892800000,  //Epoch & Unix Timestamp
      "year": 2017,
    }
    */
    //Adds an appointment to day
  addItems(day){
      const time = day.timestamp + 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
        this.state.items[strTime].push({
          name: day.appointment + ' ' + strTime,
          height: Math.max(50, Math.floor(Math.random() * 150))
        });
      const newItems = {};
          Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
          this.setState({
            items: newItems
        });
      }
    }


  //Fills in empty list items for days with no items, to have them render properly in the agenda
  loadItems(day) {
    setTimeout(() => {
      for (let i = -20; i < 45; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }

  //Sets how items should be rendered
  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  //Sets what should render for days without items in the agenda
  renderEmptyDate(day) {
    return (
      <View style={styles.emptyDate}><Text></Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }


  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  //Gets unix timestamp for date
  getEpochTime(year, month, day){
    var milliseconds = (new Date(year, month, day)).getTime();
    return milliseconds;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//FORMS//
//////////////////////////////////////////////////////////////////////////////////////////////////
class FormGenerator extends Component {
  newAppointment() {
    const formValues = this.formGenerator.getValues();
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
        <View style={styles.submitButton}>
          <Button block onPress={() => this.newAppointment()}>
            <Text>Login</Text>
          </Button>
        </View>
      </View>
    );
  }
}



AppRegistry.registerComponent('FormGenerator', () => FormGenerator);

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    backgroundColor: 'gray',
    paddingTop: 23,
    height: 620
  },
  Agenda:{
    height:570
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  wrapper: {
    flex: 1,
    marginTop: 150,
  },
  Button: {
    paddingHorizontal: 10,
    paddingTop: 20,
  }
});