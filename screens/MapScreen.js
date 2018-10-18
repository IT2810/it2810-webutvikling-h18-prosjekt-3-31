import React from 'react';
import { MapView, Location, Permissions, } from 'expo';
import {Text, View, StyleSheet} from 'react-native';

// init location data, shows Trondheim and sets a `zoom level`
const LATITUTE = 63.417037;
const LONGITUDE = 10.403093;
const LATITUDE_DELTA = 0.0222;
const LONGITUDE_DELTA = 0.0121;


export default class MapScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mapRegion:null,
      locationResult: null,
      finishedLoading: false,
      latitude: LATITUTE,
      longitude: LONGITUDE,
    };
  }

  // title of screen
  static navigationOptions = {
    title: 'Map',
  };


  componentWillMount() {
    this._getLocationAsync();
  }

  // allowes users to pan and zoom the map
  _handleMapRegionChange = newmapRegion => {
    this.setState({ newmapRegion });
  };
  
  // setes the coordinate for the map marker, after having loaded loacation, the maker should be different from the map center
  componentWillUpdate(){
    if (this.state.finishedLoading){
      if (this.state.latitude != this.state.mapRegion.latitude && this.state.longitude != this.state.mapRegion.longitude){
        this.setState({
          latitude: this.state.mapRegion.latitude,
          longitude: this.state.mapRegion.longitude,
        })
      } 
    }
  }

  // loades the user location, runs on startup
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ locationResult: 'Permission to access location was denied' });
    } else { this.setState({ hasLocationPermissions: true });    }
 
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });
    
    // sets intial coordinates, will be same for region and marker
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
  
  render() {
    if (!this.state.finishedLoading){
      return(
        <View style={allStyles.cont}>

          <Text style= {allStyles.loading}>
            Getting your location...
          </Text>
          
          <MapView
              style={allStyles.map}
              initialRegion={{
                latitude: LATITUTE, 
                longitude: LONGITUDE, 
                latitudeDelta: LATITUDE_DELTA, 
                longitudeDelta:LONGITUDE_DELTA
              }}
              onRegionChange={this._handleMapRegionChange}
            >
          </MapView>
        </View>
      
      );
    }
    else{
      return(
        <View style={allStyles.cont}>
          
          <MapView
            style={allStyles.map}
            initialRegion={this.state.mapRegion}
            onRegionChange={this._handleMapRegionChange}
          >
            <MapView.Marker
              coordinate={{latitude: this.state.latitude, longitude: this.state.longitude }}
              title={"You are here!"} 
            />
          </MapView>
        </View>
      
      );
    }   
  }
}


const allStyles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },

  map: {
    alignSelf: 'stretch', 
    flex:1,
  },
  loading: {
    alignSelf: "center",
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
});
