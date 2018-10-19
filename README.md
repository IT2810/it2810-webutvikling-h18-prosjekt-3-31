# it2810-webutvikling-h18-prosjekt-3-31
In this project we made a personal information manager app. The app helps you keep track of appointments and todos, and also features a map and a calendar. By using the app the user can add new appointments connected to a date and new todos, and see where she/he is on the map. It is supposed to be motivational by counting completed todos, and help you reach a specific number of todos a month.

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
* [Techonology, API, Library Choices](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#technology-api-library-choices)
* [Components](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#components)
  - [CalendarsScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#calendarsscreen)
  - [TodoScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#todoscreen)
  - [FormScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#formscreen)
  - [MapScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#mapscreen)
* [Tutorial](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#tutorial)
* [Test Coverage](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#Code-coverage)


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

## Technology, API, Library Choices
* React Navigation
  - We decided to use React Navigation to handle our main tab bar (Bottom bar), in addition to the stack navigator for the Agenda View.
  The reason we decided to use React Navigation is that it is well documented, and is also a well implemented library. Finally expo also recommended the usage of React Navigation.
* React Native Calendar
  - As we came up with ideas for the project, we all landed on the need for an agenda / calendar. And after searching around and reading recommendations and tutorials we ended up with React Native Calendar. React Native Calendar was a well implemented component, that supported all our needs, such as an agenda view, calendar view, markers for dates and an easy way to add items to the agenda.
* React Native Form Builder
  - Looking up the different ways to build forms, we realized that using the base react native library to build a form would end up with a lot of code just to get the list to show right, in addition to making it harder to build a JSON object with all the forms in it. So we ended up using React Native Form Builder which could handle all of these things for us. 
*  React Native Maps
	- While the map is imported from Expo, the map that Expo displays is the `<mapview>`-component from React native maps. The maps shows Google Maps on android devices and Apple Maps in iOS devices.
* Native Base
  - Early on we knew that our app would have to work both on Android and iOS, and that the render, buttons, icons etc. could vary widely from device to device. Therefore we ended up using Native Base, which is a sleek, ingenious and dynamic front-end framework. What is really great with NativeBase is that we could use shared UI cross-platform components, and that it fully supported any native third-party libraries out of the box.
* React Native
	- We used react native to build the app, react native allows developers to only use JavaScript
	to create apps, which use the same design as React. This allows developers to 
	compose moble UIs easily. React Native allows developers to create real mobile apps
	that are indistinguishable from apps built used C# or Java, and it uses the same 
	fundamental building blocks as regular iOS and Android apps.
* Expo
	- Expo is an app and software framework for exhibits and expositions. It uses Facebook's React Native framework, and aids in the development of apps.  With the Expo app you can test on a device without having to set up an iOS Simulator or an Android Virtual Device. Furthermore, Expo has software development kit which means the app can access sensors and functionality that the device has, for instance camera, accelerometer and location. While these features can be implemented using open source packages, Expo makes them available in one place. 

## Components
* [CalendarsScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#calendarsscreen)
* [TodoScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#todoscreen)
* [FormScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#formscreen)
* [MapScreen](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/master/README.md#mapscreen)

#### CalendarsScreen
Contains the Agenda with appointments.
Dependent on React Navigation for the stack navigator.
Implements AsyncStorage for storing appointments locally between sessions.

#### TodoScreen
Contains a list of the todos you have made. You can add new ones in the "Add task" TextInput. Deleting done todos by pressing "X". 
Implemented a counter that keeps track of how many todos you have completed. Implements AsyncStorage for storing appointments locally between sessions.

#### FormScreen
Contains forms for adding a new appointment to the agenda in CalendarsScreen
Dependent on React Navigation and React Native Form Builder

#### MapScreen
Shows a map, then finds the location of the user and places a marker there. You can pan, zoom and double tap to change the view of the map, as well as tap the marker to display a small text, showing that it found your location. 
The map is loaded using react-native-maps. 

## Tutorial

#### CalendarsScreen
To give you an easy introducdtion to CalendarsScreen and the functions that aren't easily
recognizable, we've written a small introduction to the largers functions in this class.
CalendarsScreen has a couple of methods that you should familiarize yourself with
Mainly we have 
```javascript
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
    return newDayObject;
  }
```
This function takes in an Appointment string, a date object and a time object.
The date and time objects are both javascript date objects, but one contains the correct date
and the other contains the correct time for the appointment to be added.
The function itself then gets the correct information out of each object,
runs getEpochTime and gets the UNIX epoch time for the date and time
It formats everything into a Day object which the class uses in multiple locations.

Other than this the class has
```javascript
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
```
This class takes in a Day object (such as the one created by the the function above).
It then checks the items that already exists in the state, and if there are none at the
specified Day objects time, it creates a new list, pushes the Day objects appointment string
date and time onto the new list, and adds it to the state.
However if there is a list already at the Day objects time, it will push the Day objects appointment string 
and date onto the existing list, and add it to the state.
Lastly it parses through the state to see if there are new items and sets the state, triggering
a rerender.

```
<Agenda style={styles.Agenda}
        items={this.state.items}
        selected={'2018-10-15'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        loadItemsForMonth={this.loadItems.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        theme={{
          agendaTodayColor: 'red'
        }}
        />
```
Also, to get the agenda from React Native Calendar to render, we use the following under render, there's a lot more possibilities available if you take a look on the React Native Calendar page.

All of the code in CalendarsScreen is pretty well commented, and the other functions are
smaller and easier to familiarize yourself with, so for further information we recommend taking a look at
the source code.

#### FormScreen
Formscreen doesn't contain a lot of code, or functions. It does however make use of the Stack Navigator
to pass a JSONObject with formvalues back to the CalendarsScreen.
It does this after the push of the button Add Appointment, which triggers the following
two functions
```javascript
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
```

newAppointment is firstly triggered, which gets the values of the form, and sends them
into formFilled. formFilled then checks the values to make sure there's an actual date and time
if there are, it passes the object to the CalendarsScreen, which creates a new day object and
adds this to the Agenda, and then navigates to the CalendarsScreen. However, if there is no date or time, it passes nothing, 
and only navigates back to the CalendarsScreen

```
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
  
Render(){
	return(
		<GenerateForm
				ref={(c) => {
				  this.FormScreen = c;
				}}
				fields={fields}
			      />
		)
	}
```
To actually use React Native Form Builder to easily build and render forms, you only need a minor amount of code, as you can see in the example above.
To see all the possibilities, we'd recommend having a look on the React Native Form Builder page.

#### TodoScreen
To give a little introduction on how the TodoScreen component works. Todoscreen have some methods it can be wise to familiarize yourself with. We have
```javascript
addTask = text => {
    if (text.trim().length > 0) {
      this.setState({
        tasks: [...this.state.tasks, {key: this.state.tasks.length, text: text}],
        text: ""
      },
        () => TasksStorage.save(this.state.tasks)
      );
    }
  };
```
This function adds a new task with the parameter “text”. The function trims the text and adds it to the state tasks. Then it sets the text to empty, as to not have any text in the input-button on the app. Finally it saves the new task in TaskStorage. 

The class also have
```javascript
deleteTask = i => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();
        tasks.splice(i, 1);
        return { tasks: tasks, counter: prevState.counter + 1 };
      },
      () => TasksStorage.save(this.state.tasks),
    );
    this.saveCounter();
  };
```
This function deletes the task with index i. Then it updates the tasks-list with the updated values, and updates the counter with 1 per deleted task. Afterwards it saves the new tasks-list   and the counteris saved locally. 

The rest of the code in TodoScreen is well commented, and the other functions are smaller and easier to familiarize yourself with, so for further information we recommend taking a look at the source code.

#### MapScreen	
The main functionality for the mapscreen, other than displaying the map, is to find your location. It is a fairly simple component, that makes use of the Expo `MapView` and `Location` components. 

At start up the `_getLocationAsync` function is triggernd. It askes for permission to access the user's location and if granted, sets the map region and map marker coordinates.
```javascript
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ locationResult: 'Permission to access location was denied' });
    } else { this.setState({ hasLocationPermissions: true });    }
 
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });
    
     this.setState({mapRegion: 
                        { latitude: location.coords.latitude, 
                          longitude: location.coords.longitude, 
                          latitudeDelta: LATITUDE_DELTA, 
                          longitudeDelta:LONGITUDE_DELTA
                        },
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    finishedLoading: true,  
                    });
  };
```
Attempting to display a user’s position before a location has been found will cause an error, therefore this component renders conditionally  

```javascript
 render() {
    if (!this.state.finishedLoading){
      return(
        ...  
      );
    }
    else{
      return(
       	...
      );
    }   
  }

```


## Testing
We have tested our components with Jest and "react-test-renderer". 

To run our test, open cmp or terminal and use the following command 

```
npm test
```

#### TodoScreen
Started to test the different functions, addTasks and deleteTasks, also made a test for the TextInput. We did not get Enzyme to work, so we chose not to test the delete-button ("X"). The button is multiple level deep in the view, and without Enzyme it was not possible to test it. Although, we tested the button interactively. It worked as it should here. The test for TodoScreen also includes a snapshot test.

#### CalendarsScreen
Started first with a snapshot test, after that I systematically went through important functions, and the functions they again used.
First I needed to test that the EpochTimeConverter worked as intended, then writing a test for CreateDayObject,
propsHasChanged, addItems and finally onDayPress to check that the state changed when changing the selection.
Finally I wanted to see that the items in the agenda rendered properly, both with items and empty.

#### MapScreen
The map screen runs a snapshot test, and a shallow render such that the initial region for map will remain null. The reason for this is that the rendering test will pass independent of the current location of the tester. 

#### FormScreen
Only minor tests for this screen, as it does not contain a lot of functionality. Code has been written so that it is impossible for any paths in the screen to lead to errors. (Mainly use of navigation, and only one path that actually leads to a returned value to CalendarsScreen. Does contain a snapshot test.

#### Code coverage

[Snapshots](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/tree/Master/__tests__/__snapshots__)

![Code Coverage](https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-31/blob/Master/assets/images/Coverage.png)

## Sources 
Code inspiration for the TodoScreen:
[Codeburst](https://codeburst.io/todo-app-with-react-native-f889e97e398e)
