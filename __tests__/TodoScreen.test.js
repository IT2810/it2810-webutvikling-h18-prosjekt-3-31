import 'react-native';
import React from 'react';
import TodoScreen from '../screens/TodoScreen';
import renderer from 'react-test-renderer';


it('renders correctly', async () => {
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
});

test('Counter updates when deleting a task', () => {
    const TodoScreenComponent = renderer
        .create(< TodoScreen />).root;
    const instance = TodoScreenComponent.instance;
    const text = "Todo";
    instance.addTask(text);
    instance.deleteTask(text);
    expect(instance.state.counter).toBe(1);
});

it('TextInput can add tasks', () => {
    const TodoScreenComponent = renderer.create(< TodoScreen />);
    const root = TodoScreenComponent.root;
    const instance = root.instance;
    const text = "task"
    root.findByType('TextInput').props.onSubmitEditing(instance.addTask(text));
    expect(instance.state.tasks[0]['text']).toEqual(text);
});
