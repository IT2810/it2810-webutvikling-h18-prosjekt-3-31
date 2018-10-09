import React from 'react';
import { Constants, MapView, Location, Permissions, } from 'expo';
import { Text, View, StyleSheet, TextInput, ScrollView} from 'react-native';

export default class MapScreen extends React.Component {

  static navigationOptions = {
    title: 'Map',
  };

  state = {
    mapRegion:null,
    locationResult: null,
    places: ",",
    // location: {coords: { latitude:  63.431593, longitude:  10.394109}},
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    // console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _handlePlacesChange(newText) {
     console.log(newText);

    // this.setState({places: this.state.places.concat("||", String(newText))});
  }

  
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }
 
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });
    
    // Center the map on the location we just fetched.
     this.setState({mapRegion: 
                        { 
                          latitude: location.coords.latitude, 
                          longitude: location.coords.longitude, 
                          latitudeDelta: 0.0522, 
                          longitudeDelta: 0.0321
                        }
                    });
   };
   
   

  render() {
    return(
      <View style={allStyles.cont}>
        {/* <Text style={allStyles.miniTitle} >
         This map shows you your area!!
        </Text> */}
        
        <MapView
          style={allStyles.map}
     
          initialRegion={{ // sets the focuson trd
            latitude: 63.431593, 
            longitude: 10.394109, 
            latitudeDelta: 0.0522, 
            longitudeDelta: 0.0321
          }}
          onRegionChange={this._handleMapRegionChange}
        >
        {/* Fixme: does not show  accurate enough to actually use? - not using it*/}
        {/* <MapView.Marker   
          coordinate={this.state.locationResult.coords}
          title="You are here!"
          description="This is where you are according to your location data"
        /> */}

        <MapView.Marker
              coordinate={{latitude: 63.417037, longitude: 10.403093 }}
              title={"Department of Computer Science"}
              description={"A place to go to learn all about CS"}
          />
        </MapView>

        <Text style={allStyles.cities}>
          placed to go and thing to seee
        </Text>

{/* TODO: skrive tester forst, dette kan vente
        <ScrollView style={{padding:10}}>

          <TextInput
            // style={allStyles.txtIn}
            style={allStyles.txtIn}
            placeholder="List places you want to go!)"
            onChangeText={(text) => this.setState({text})}
          />
            <Text style={allStyles.cities}>
              {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}          
            </Text>

          </ScrollView>
*/}
      </View>
    );
  }
}
// https://snack.expo.io/@schazers/expo-map-and-location-example

const allStyles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },

  map: {
    alignSelf: 'stretch', 
    height: 550,
    // todo: change here if placed added again!
  },
  para: {
    margin: 14,
    fontSize: 14,
    color: '#34495e',

  },
  loading:{
    textAlign: 'center',
  },
  miniTitle: {
    margin: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  txtIn: {
    fontSize: 12, 
    height: 50,
    fontSize: 18,
  },
  cities: { 
    padding: 5,
    fontSize: 20},

});
