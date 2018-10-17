import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button,
  TextInput,
  Keyboard,
  Platform
} from "react-native";

/* Checks if the platform is android, true if android, false if not */
const isAndroid = Platform.OS == "android";
const viewPadding = 10;


export default class TodoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {tasks: [], text: "", counter: 0, goal: "Try to reach 20 within this month."};
  }

  /* The title of the screen */
  static navigationOptions = {
    title: 'Your personal todos',
  };

  /* adds text to tasks 
   * Sets text: "" so to remove it from the input-bar
   * Saves the task in tasks with async in setState, so we save it each time the state changes, and avoids
   * saving old data
   */
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

  /* deletes the task with index i */
  deleteTask = i => {
    //(counter) => this.setState({ counter: this.state.counter + 1 });
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();
        tasks.splice(i, 1);
        return { tasks: tasks, counter: prevState.counter + 1 };
      },
      () => TasksStorage.save(this.state.tasks),
    );
  };

  /* When the keybord shows we change the paddingBottom, so the input shows above the keyboard */
  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );
    /* When the keyboard is gone, we change the paddingBottom back to the original value*/
    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );
    /* After the component it mounted, we load the tasks from localStorage*/
    TasksStorage.all(tasks => this.setState({ tasks: tasks || [] }));
  }

  render() {
    return (
      <View style={[styles.container, { paddingBottom: this.state.viewPadding }]} >
        <Text style={styles.goal}>
          { "You have completed " + this.state.counter + " todo(s). "}{ '\n' }{ this.state.goal }
        </Text> 
        <FlatList   //The task-list
          style={styles.list}
          data={this.state.tasks} //The array of tasks
          keyExtractor = { (item, index) => index.toString() }
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemCont}>
                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                <Button title=" X " onPress={() => this.deleteTask(index)} />  
              </View>
              <View style={styles.hr} />
            </View>
          }
        />
        <TextInput //Input to add task
          style={styles.textInput}
          onChangeText={(text) => this.setState({ text: text })}
          onSubmitEditing={() => this.addTask(this.state.text)}
          value={this.state.text}
          placeholder="Add Tasks"
          returnKeyType="done"
          returnKeyLabel="done"
          maxLength={30}
        />
      </View>
    );
  }
}

/* ConvertToArrayOfObject() and convertToStringWithSeparators(): serialize the string with separator "||",
 * then deserialize it to retrieve it
 * all() and save(): saves the data locally with AsyncStorage
 */
let TasksStorage = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem('TASKS', (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem('TASKS', this.convertToStringWithSeparators(tasks));
  }
};



/* Styling */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E7EDF2",
    padding: viewPadding,
    paddingTop: 20,
  },
  goal: {
    backgroundColor: "#D5E1E9"
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
    paddingRight: 15,
  },
  hr: {
    height: 1,
    backgroundColor: "#B9C9D4"
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "#B9C9D4",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  },
});