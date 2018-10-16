# it2810-webutvikling-h18-prosjekt-3-31

## Dependencies

[React Native Calendar](https://github.com/wix/react-native-calendars)

[React Native Form Builder](https://github.com/bietkul/react-native-form-builder)

[Native Base](https://github.com/GeekyAnts/NativeBase) 

[React Navigation](https://github.com/react-navigation/react-navigation)

[React Native Maps](https://github.com/react-community/react-native-maps)

## Features

* Agenda with calendar that stores appointments for dates with title and date, also allows adding new appointments
* Todo list to add a list of things you need to do, independent of which date it is. Allows adding and removing todos.
* Gps and map functionality

## Getting Started
* [Installation](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#installation)
* [Running Project](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#running-project)
* [Components](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#components)
  - [CalendarsScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#calendarsscreen)
  - [TodoScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#todoscreen)
  - [FormScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#formscreen)
  - [MapScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#mapscreen)
* [Test Coverage](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#Code-coverage)
* [Techonology, API, Library Choices](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#technology-api-library-choices)

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
* [CalendarsScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#calendarsscreen)
* [TodoScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#todoscreen)
* [FormScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#formscreen)
* [MapScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#mapscreen)

#### CalendarsScreen
Contains the Agenda with appointments
Dependent on React Navigation for the stack navigator
Implements AsyncStorage for storing appointments locally between sessions.

#### TodoScreen
Contains a list of the todos you have made. You can add new ones in the "Add task" TextInput. Deleting done todos by pressing "X". 

#### FormScreen
Contains forms for adding a new appointment to the agenda in CalendarsScreen
Dependent on React Navigation and React Native Form Builder

#### MapScreen
Shows a map, then finds the location of the user and places a marker there. You can pan, zoom and double tap to change the view of the map, as well as tap the marker to display a small text, showing that it found your location. 
The map is loaded using react-native-maps. 

## Technology, API, Library Choices
* React Navigation
  - We decided to use React Navigation to handle our main tab bar (Bottom bar), in addition to the stack navigator for the Agenda View.
  The reason we decided to use React Navigation is that it is well documented, and is also a well implemented library. Finally expo also recommended the usage of React Navigation.
* React Native Calendar
  - As we came up with ideas for the project, we all landed on the need for an agenda / calendar. And after searching around and reading recommendations and tutorials we ended up with React Native Calendar. React Native Calendar was a well implemented component, that supported all our needs, such as an agenda view, calendar view, markers for dates and an easy way to add items to the agenda.
* React Native Form Builder
  - Looking up the different ways to build forms, we realized that using the base react native library to build a form would end up with a lot of code just to get the list to show right, in addition to making it harder to build a JSON object with all the forms in it. So we ended up using React Native Form Builder which could handle all of these things for us. 
* Native Base
  - Early on we knew that our app would have to work both on Android and iOS, and that the render, buttons, icons etc. could vary widely from device to device. Therefore we ended up using Native Base, which is a sleek, ingenious and dynamic front-end framework. What is really great with NativeBase is that we could use shared UI cross-platform components, and that it fully supported any native third-party libraries out of the box.
  
## Testing
We have tested our components with Jest and "react-test-renderer". 

To run our test, open cmp or terminal and use the following command 

```
npm test
```

#### TodoScreen
Started to test the different functions, addTasks and deleteTasks, also made a test for the TextInput. We did not get Enzyme to work, so we chose not to test the delete-button ("X"). The button is multiple level deep in the view, and wihout Enzyme it was not possible to test it. Although, we tested the button in our app. It worked as it should here.

#### CalendarsScreen
Started first with a snapshot test, after that I systematically went through important functions, and the functions they again used.
First I needed to test that the EpochTimeConverter worked as intended, then writing a test for CreateDayObject,
propsHasChanged, addItems and finally onDayPress to check that the state changed when changing the selection.
Finally I wanted to see that the items in the agenda rendered properly, both with items and empty.

#### Code coverage

[Snapshots](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/tree/Master/__tests__/__snapshots__)

![Code Coverage](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/assets/images/Test%20Coverage%20Report.jpg)

## Sources 
Code inspiration for the TodoScreen:
[Codeburst](https://codeburst.io/todo-app-with-react-native-f889e97e398e)
