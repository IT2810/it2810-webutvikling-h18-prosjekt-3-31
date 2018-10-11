
import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
jest.mock('react-native-vector-icons', () => {
  const ActualTabBarIOS = require.requireActual('TabBarIOS');
  const React = require('react');

  return {
    createIconSet: () => {
      const Icon = class extends React.Component {
        render() {
          return jest.fn();
        }
      }

      Icon.TabBarItem = ActualTabBarIOS.Item;
      return Icon;
    },

    createIconSetFromFontello: () => {
      return {
        TabBarItem: ActualTabBarIOS.Item
      }
    },

    createIconSetFromIcoMoon: jest.fn(),
  }
});

describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the loading screen', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the root without loading screen', async () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
