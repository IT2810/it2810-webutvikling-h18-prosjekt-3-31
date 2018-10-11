import CalendarsScreen from '../screens/CalendarsScreen';
import renderer from 'react-test-renderer';
import React from 'react';

test('EpochTimeConverted works as intended', () => {
  const CalendarsScreenComponent = renderer
      .create(< CalendarsScreen />).root;
  const instance = CalendarsScreenComponent.instance;
  const time = new Date(2018, 9, 10, 10, 0, 24, 181);
  const timestamp = 1536480024181;
  testEpochTimeObject = instance.getEpochTime(2018, 9, 10, 10, 0, 24, 181);
  expect(testEpochTimeObject).toEqual(timestamp);
});


test('Create Day Object works as intended', () => {
  const CalendarsScreenComponent = renderer
      .create(< CalendarsScreen />).root;
  const instance = CalendarsScreenComponent.instance;
  const day = new Date(2018, 9, 19, 13, 36, 0, 0);
  const time = new Date(2018, 9, 10, 10, 0, 24, 181);
  const DayObject = {
    "appointment": "Webutvikling frist",
    "dateString": "2018-10-19",
    "day": "19",
    "month": "10",
    "timestamp": 1539842424001,
    "year": "2018",
    };

  testDayObject = instance.createDayObject("Webutvikling frist", day, time);
  expect(testDayObject).toEqual(DayObject);
});

test('Test PropsHasChanged', () => {
  const CalendarsScreenComponent = renderer
      .create(< CalendarsScreen />).root;
  const instance = CalendarsScreenComponent.instance;
  const dayNothing = 'nothing';
  testDayObject = instance.componentPropsHasChanged(dayNothing);
  expect(testDayObject).toEqual(false);
});

test('Test addItems', () => {
  
  const CalendarsScreenComponent = renderer
      .create(< CalendarsScreen />).root;
  const instance = CalendarsScreenComponent.instance;
  const day = new Date(2018, 9, 19, 13, 36, 0, 0);
  const time = new Date(2018, 9, 10, 10, 0, 24, 181);
  const DayObject = {
    "appointment": "Webutvikling frist",
    "dateString": "2018-10-19",
    "day": "19",
    "month": "10",
    "timestamp": 1539842424001,
    "year": "2018",
    };
  instance.addItems(DayObject);
  const newtime = DayObject.timestamp + 24 * 60 * 60 * 1000;
  const strTime = instance.timeToString(newtime);
  testDayItem = [{
    name: DayObject.appointment + ' ' + strTime,
    height: 50
  }];
  expect(instance.state.items[strTime]).toEqual(testDayItem);
});

test('Test onDayPress', () => {
  
  const CalendarsScreenComponent = renderer
      .create(< CalendarsScreen />).root;
  const instance = CalendarsScreenComponent.instance;
  const DayObject = {
    "appointment": "Webutvikling frist",
    "dateString": "2018-10-19",
    "day": "19",
    "month": "10",
    "timestamp": 1539842424001,
    "year": "2018",
    };
    instance.onDayPress(DayObject);
    expect(instance.state.selected).toEqual(DayObject.dateString);

});

test('Test renderItem', () => {
  
  const CalendarsScreenComponent = renderer
      .create(< CalendarsScreen />).root;
  const instance = CalendarsScreenComponent.instance;
  const DayObject = {
    "appointment": "Webutvikling frist",
    "dateString": "2018-10-19",
    "day": "19",
    "month": "10",
    "timestamp": 1539842424001,
    "year": "2018",
    };
    instance.addItems(DayObject);
    const newtime = DayObject.timestamp + 24 * 60 * 60 * 1000;
    const strTime = instance.timeToString(newtime);
    const actualView = instance.renderItem(instance.state.items[strTime]);
    const view = "{\"key\":null,\"ref\":null,\"props\":{\"style\":[{\"backgroundColor\":\"white\",\"flex\":1,\"borderRadius\":5,\"padding\":10,\"marginRight\":10,\"marginTop\":17},{}],\"children\":{\"key\":null,\"ref\":null,\"props\":{\"accessible\":true,\"allowFontScaling\":true,\"ellipsizeMode\":\"tail\"},\"_owner\":null,\"_store\":{}}},\"_owner\":null,\"_store\":{}}";
    const newactualView = JSON.stringify(actualView);
    expect(newactualView).toEqual(view);

});

test('Test renderEmptyDate', () => {
  
  const CalendarsScreenComponent = renderer
      .create(< CalendarsScreen />).root;
  const instance = CalendarsScreenComponent.instance;
  const DayObject = {
    "appointment": "Webutvikling frist",
    "dateString": "2018-10-19",
    "day": "19",
    "month": "10",
    "timestamp": 1539842424001,
    "year": "2018",
    };
    instance.addItems(DayObject);
    const actualView = instance.renderEmptyDate(DayObject);
    const view = "{\"key\":null,\"ref\":null,\"props\":{\"style\":{\"height\":15,\"flex\":1,\"paddingTop\":30},\"children\":{\"key\":null,\"ref\":null,\"props\":{\"accessible\":true,\"allowFontScaling\":true,\"ellipsizeMode\":\"tail\"},\"_owner\":null,\"_store\":{}}},\"_owner\":null,\"_store\":{}}";
    const newactualView = JSON.stringify(actualView);
    expect(newactualView).toEqual(view);

});


it('renders correctly', () => {
  const tree = renderer
    .create(<CalendarsScreen />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});