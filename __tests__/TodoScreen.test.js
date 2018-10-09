import 'react-native';
import React from 'react';
import TodoScreen from '../screens/TodoScreen';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(< TodoScreen />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('The text is empty to begin with', () => {
    const TodoScreenComponent = renderer
        .create(< TodoScreen />).root;
    const instance = TodoScreenComponent.instance;
    console.assert(instance.state.text === "");
});

test('Can add task', () => {
    const TodoScreenComponent = renderer
        .create(< TodoScreen />).root;
    const instance = TodoScreenComponent.instance;
    const text = "Todo";
    instance.addTask(text);
    expect(instance.state.tasks[0]['text']).toEqual(text);
});

test('Can delete task', () => {
    const TodoScreenComponent = renderer
        .create(< TodoScreen />).root;
    const instance = TodoScreenComponent.instance;
    const text = "Todo";
    instance.addTask(text);
    instance.deleteTask(text);
    expect(instance.state.task).toBeUndefined();
    //console.log(instance.state.tasks);
});

test('The button works and deletes the task', () => {
    const TodoScreenComponent = renderer
        .create(< TodoScreen />).root;
    const instance = TodoScreenComponent.instance;
    const text = "Todo";
    instance.addTask(text);
    console.log(instance.state.tasks);
    const button = TodoScreenComponent.find('Button').onPress();
    //expect(instance.state.task).toBeUndefined();
});
