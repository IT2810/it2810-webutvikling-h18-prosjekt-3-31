import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import {Calendar} from 'react-native-calendars';

export default class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Calendar
          style={styles.calendar}
          onDayPress={this.onDayPress}
          current={'2012-05-16'}
          displayLoadingIndicator
          markingType={'multi-dot'}
          markedDates={{
            [this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'},
            '2012-05-08': {dots: [{key: 'vacation', color: 'blue', selectedDotColor: 'white'}, {key: 'massage', color: 'red', selectedDotColor: 'white'}], selected: true},
            '2012-05-09': {dots: [{key: 'vacation', color: 'blue', selectedDotColor: 'red'}, {key: 'massage', color: 'red', selectedDotColor: 'blue'}], disabled: true}
          }}
          hideArrows={false}
        />
      </ScrollView>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
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
    flex: 1,
    backgroundColor: 'gray'
  }
});