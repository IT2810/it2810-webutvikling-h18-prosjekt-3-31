import FormScreen from '../screens/FormScreen';
import renderer from 'react-test-renderer';
import React from 'react';


it('renders correctly', () => {
    const tree = renderer
      .create(<FormScreen />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });