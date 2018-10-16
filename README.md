# it2810-webutvikling-h18-prosjekt-3-31

## Dependencies

[React Native Calendar](https://github.com/wix/react-native-calendars)

[React Native Form Builder](https://github.com/bietkul/react-native-form-builder)

[Native Base](https://github.com/GeekyAnts/NativeBase) 

[React Navigation](https://github.com/react-navigation/react-navigation)

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
* [Test Coverage](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/develop/README.md#Code-coverage)
* [Techonology, API, Library Choices](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/develop/README.md#technology-api-library-choices)

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
Contains a list of the todos you have made. You can add new ones in the "Add task" TextInput. Deleting done todos by pressing "X". 

#### FormScreen
Contains forms for adding a new appointment to the agenda in CalendarsScreen
Dependent on React Navigation and React Native Form Builder

#### MapScreen

## Technology, API, Library Choices
* React Navigation
  - We decided to use React Navigation to handle our main tab bar (Bottom bar), in addition to the stack navigator for the Agenda View.
  The reason we decided to use React Navigation is that it is well documented, and is also a well implemented library. Finally expo also recommended the usage of React Navigation.
* React Native Calendar
  - As we came up with ideas for the project, we all landed on the need for an agenda / calendar. And after searching around and reading recommendations and tutorials we ended up with React Native Calendar. React Native Calendar was a well implemented component, that supported all our needs, such as an agenda view, calendar view, markers for dates and an easy way to add items to the agenda.
* React Native Form Builder
  - Looking up the different ways to build forms, we realized that using the base react native library to build a form would end up with a lot of code just to get the list to show right, in addition to making it harder to build a JSON object with all the forms in it. So we ended up using React Native Form Builder which could handle all of these things for us. 
* Native Base

## Testing
We have tested our components with Jest and "react-test-renderer". 
#### TodoScreen
Started to test the different functions, addTasks and deleteTasks, also made a test for the TextInput. We did not get Enzyme to work, so we chose not to test the delete-button ("X"). The button is multiple level deep in the view, and wihout Enzyme it was not possible to test it. Although, we tested the button in our app. It worked as it should here.

#### Code coverage

## Sources 
Code inspiration for the TodoScreen:
[Codeburst](https://codeburst.io/todo-app-with-react-native-f889e97e398e)
