import 'react-native';
import React from 'react';
import MapScreen from '../screens/MapScreen.js';
import ShallowRenderer from 'react-test-renderer/shallow'
import renderer from 'react-test-renderer';


it('renders correctly', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<MapScreen/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});

it('find-test-file', () => {
    expect(true).toBeTruthy();
});



// test('can change location', () => {
//     const MapScreenComponent = renderer.create(< MapScreen />).root;
//     const instance = MapScreenComponent.instance;
//     instance._handleMapRegionChange({latitude: 63.431593, longitude: 10.394109, 
//                                     latitudeDelta: 0.0422, longitudeDelta: 0.0221})
    
//     expect(instance.state.mapRegion).toEqual({latitude: 63.431593, longitude: 10.394109, 
//                                             latitudeDelta: 0.0422, longitudeDelta: 0.0221});
    
// });
        
   

// test('props of mapscreen', () => {
//     const renderer = new ShallowRenderer()
//     renderer.render(<MapScreen/>);
//     const result = renderer.getRenderOutput();

//     // expect(result.).toBe("View")
//     expect(result.props.children).toEqual([
//         <MapView>

//         </MapView>

//         ])

//     // expect(1).toBe(1);
// });
    
// https://www.codeworkshop.com.au/react-native-testing-expo-jest/
// https://jestjs.io/docs/en/es6-class-mocks
