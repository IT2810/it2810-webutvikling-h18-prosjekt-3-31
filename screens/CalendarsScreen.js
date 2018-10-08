import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { AppRegistry, Button } from 'react-native';
import { View, Text } from 'native-base';
import { AsyncStorage } from "react-native"

export default class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {items: {}, getStorage: false};
    this.addItems.bind(this)
    let day = 'nothing'
  }

  static navigationOptions = { header: null } 
  //

  //After mounting set props.
  componentWillMount(){
    this.getKeys();
      }

  componentDidMount(){
    const { navigation } = this.props;
    const day = navigation.getParam('day', 'nothing');
    console.log(day);
    
  }
  // If this.day is different than param passed from formscreen
  // Run componentpropshaschanged with the value from the param passed from formscreen
  componentDidUpdate(){
    if (this.day != this.props.navigation.getParam('day', 'nothing')){
      this.componentPropsHasChanged(this.props.navigation.getParam('day', 'nothing'));
      
    }
    //update this.day to match the current param prop, to prevent running above method more than once
    this.day = this.props.navigation.getParam('day', 'nothing');
  }
  
  async getKeys() {
    try {
      const existingAppointments = await AsyncStorage.getItem('appointments');
      let appointments = JSON.parse(existingAppointments);
      if ( !appointments){
        return;
      }
      else{
        console.log(appointments);
        for (var i=0; i<appointments.length; i++){
          this.addItems(appointments[i])
        }
      }
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async saveKey(appointment) {
    //Get items in storage
      const existingAppointments = await AsyncStorage.getItem('appointments')
      let newAppointment = JSON.parse(existingAppointments);
      //Check if there are items in storage
      if( !newAppointment ){
        newAppointment = []
      }
      //Push new appointment onto list of appointments
      newAppointment.push(appointment)
      //save the item in storage
      await AsyncStorage.setItem('appointments', JSON.stringify(newAppointment) )
      .then( ()=>{
      console.log('It was saved successfully')
      } )
      .catch( ()=>{
      console.log('Error saving appointment')
      } )
    }

  // Create an object that can be used by addItems to add a new agenda item
  createDayObject(Appointment, date, time){
    const hour = time.toISOString().substring(11,13);
    const minutes = time.toISOString().substring(14,16);
    const seconds = time.toISOString().substring(17,19);
    const milliseconds = time.toISOString().substring(20,21);
    const year = date.toISOString().substring(0,4);
    const day = date.toISOString().substring(8,10);
    const month = date.toISOString().substring(5,7);
    const newDayObject = {"appointment": Appointment,
                    "dateString": date.toISOString().substring(0,10),
                    "day": day,
                    "month": month,
                    "timestamp": this.getEpochTime(year, month, day, hour, minutes, seconds, milliseconds),
                    "year": year
                    };
    console.log(newDayObject);
    this.saveKey(newDayObject);
    this.addItems(newDayObject);
    
    //this.storekey = this.storekey + 1;

  }
  //Props have changed, been submitted from formscreen, check that day is a valid object
  //If so createDayObject
  componentPropsHasChanged(day){
    if (day != 'nothing' && day != undefined){
      this.createDayObject(day.Appointment, day.date, day.time);
      
    }
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
        title="New Appointment"
        onPress={() => this.props.navigation.navigate('Form')}
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
      else{
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
  getEpochTime(year, month, day, hours, minutes, seconds, milliseconds){
    var milliseconds = (new Date(year, month - 1, day - 1, hours, minutes, seconds, milliseconds)).getTime();
    return milliseconds;
  }
}


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
    backgroundColor: 'white',
    paddingTop: 23,
    height: 600
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
    paddingHorizontal: 0,
    paddingTop: 0,
  }
});