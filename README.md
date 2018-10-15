# it2810-webutvikling-h18-prosjekt-3-31

## Dependencies

[React Native Calendar](https://github.com/wix/react-native-calendars)

[React Native Form Builder](https://github.com/bietkul/react-native-form-builder)

[Native Base](https://github.com/GeekyAnts/NativeBase) 

## Features

* Agenda with calendar that stores appointments for dates with title and date, also allows adding new appointments
* Todo list to add a list of things you need to do, independent of which date it is. Allows adding and removing todos.
* Gps and map functionality

## Getting Started
* [Installation](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/develop/README.md#installation)
* [Running Project](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/develop/README.md#running-project)
* [Components](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/develop/README.md#components)
  - [CalendarsScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/develop/README.md#calendarsscreen)
  - [TodoScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/develop/README.md#todoscreen)
  - [FormScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/develop/README.md#formscreen)
  - [MapScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/develop/README.md#mapscreen)
* Test Coverage

## Installation
Follow instruction 02 and 03 for
[Expo](https://expo.io/learn)

Open cmd or terminal

Run the following command
```
cd [Path to desired directory]
```
Then run
```
git clone https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/tree/Master
```

## Running project
Open cmd or terminal

Run the following command
```
cd [Path to desired directory]
expo start
```
Then run on your desired device

## Components
* [CalendarsScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/develop/README.md#calendarsscreen)
* [TodoScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/develop/README.md#todoscreen)
* [FormScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/develop/README.md#formscreen)
* [MapScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/develop/README.md#mapscreen)

#### CalendarsScreen
Contains the Agenda with appointments
Dependent on React Navigation for the stack navigator
Implements AsyncStorage for storing appointments locally between sessions.

#### TodoScreen

#### FormScreen
Contains forms for adding a new appointment to the agenda in CalendarsScreen
Dependent on React Navigation and React Native Form Builder

#### MapScreen
