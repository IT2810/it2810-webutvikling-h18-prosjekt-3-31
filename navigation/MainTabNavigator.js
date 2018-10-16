import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import TodoScreen from '../screens/TodoScreen';
import CalendarsScreen from '../screens/CalendarsScreen';
import FormScreen from '../screens/FormScreen';
import MapScreen from '../screens/MapScreen';


const CalendarStack = createStackNavigator({
  Calendar: CalendarsScreen,
  Form: FormScreen,
  
  },
  {
    initialRouteName: 'Calendar',
  }
);

CalendarStack.navigationOptions = {
  headerVisible: false,
  tabBarLabel: 'Calendar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' 
          ? `ios-calendar${focused ? '' : '-outline'}` 
           : 'ios-calendar'}
    />
  ),
};

const MapStack = createStackNavigator({
  Map: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-map${focused ? '' : '-outline'}` : 'md-map'}
      />
      ),
    };

const TodoStack = createStackNavigator({
  Todo: TodoScreen,
});

TodoStack.navigationOptions = {
  tabBarLabel: 'Todo',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list${focused ? '' : '-outline'}`
          : 'mformat-list-bulleted'   // The tabBar is a bullet list
      }
    />
  ),
};

export default createBottomTabNavigator({
  CalendarStack,
  TodoStack,
  MapStack
});
