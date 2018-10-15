import React, {Component} from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  AsyncStorage, 
  Button, 
  View, 
  Text,
  Platform 
} from 'react-native';
import { Agenda } from 'react-native-calendars';

// Checks if the platform is android, true if android, false if not
const isAndroid = Platform.OS == "android";

export default class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {items: {}, getStorage: false};
    this.addItems.bind(this)
    this.day = 'nothing';
  }

  static navigationOptions = { header: null } 

  //before mounting check local storage for appointments. 
  componentWillMount(){
    this.getKeys();
  }
  // If this.day is different than param passed from formscreen
  // Run componentpropshaschanged with the value from the param passed from formscreen
  componentDidUpdate(){
    if (this.state.getStorage == true){
      if (this.day != this.props.navigation.getParam('day', 'nothing')){
        const newDayObject = this.componentPropsHasChanged(this.props.navigation.getParam('day', 'nothing'));
        this.saveKey(newDayObject);
        this.addItems(newDayObject);
        this.day = this.props.navigation.getParam('day', 'nothing');
      }
    }
    //update this.day to match the current param prop, to prevent running above method more than once  
  }
  //ASyncStorage gets all appointments from local storage
  //And add them to the Agenda
  async getKeys() {
    try {
      const existingAppointments = await AsyncStorage.getItem('appointments');
      let appointments = JSON.parse(existingAppointments);
      console.log(appointments);
      if (!appointments || appointments == null || appointments == 'null'){
        this.setState({getStorage: true});
        return;
        
      }
      else{
        for (var i=0; i<appointments.length; i++){
          this.addItems(appointments[i])
        }
        this.setState({getStorage: true});
      }
    } catch (error) {
      console.log("Error retrieving data" + error);
      this.setState({getStorage: true});
    }
  }
  async removeItemValue() {
    console.log("goodbye items");
    try {
      await AsyncStorage.removeItem('appointments');
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  //ASyncStorage component, stores appointment
  async saveKey(appointment) {
    //Get items in storage
    const existingAppointments = await AsyncStorage.getItem('appointments')
    let newAppointment = JSON.parse(existingAppointments);
    //Check if there are items in storage
    if( !newAppointment || newAppointment == null || newAppointment == 'null' ){
      newAppointment = []
    }
    //Push new appointment onto list of appointments
    if (appointment != false){
      newAppointment.push(appointment)
      //save the item in storage
      await AsyncStorage.setItem('appointments', JSON.stringify(newAppointment) )
        .then( ()=>{
      console.log('It was saved successfully')
      })
        .catch( ()=>{
      console.log('Error saving appointment')
      })
      }
  }

  // Create an object that can be used by addItems to add a new agenda item
  // Takes in an Appointment (String such as "Webutvikling frist")
  // Date in a Date object (usually on the form of 2018-10-19T13:36:00.000Z for 19October 2018)
  // Time in a date objecdt (usually on the form of 2018-10-09T10:00:24.181Z for 12:00 (disregard of gmt time, date part is ignored in the function))
  //This input would result in the following dayObject
  /*
  Object {
      "appointment": "Webutvikling frist",
      "dateString": "2018-10-19",
      "day": "19",
      "month": "10",
      "timestamp": 1539849624001,
      "year": "2018",
      }
  */
  createDayObject(Appointment, date, time){
    console.log(date);
    console.log(time);
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
    return newDayObject;
    
    //this.storekey = this.storekey + 1;
  }

  //Props have changed, been submitted from formscreen, check that day is a valid object
  //If so createDayObject
  componentPropsHasChanged(day){
    if (day != 'nothing' && day != undefined){
      const newdayObject = this.createDayObject(day.Appointment, day.date, day.time);
      return newdayObject;
    }
    else{
      return false;
    }
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
        height: 50
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
          height: 50
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
      <Button style={styles.button}
        title="New Appointment"
        onPress={() => this.props.navigation.navigate('Form') }
      />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 23,
    height: isAndroid ? 600 : 575
    
  },
  Agenda:{
    height: isAndroid ? 570 : 545
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
});