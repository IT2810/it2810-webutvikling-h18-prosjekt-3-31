import React from 'react';
import { MapView, Location, Permissions, } from 'expo';
import {Text, View, StyleSheet} from 'react-native';

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
      places: ",",
      finishedLoading: false,
      latitude: LATITUTE,
      longitude: LONGITUDE,
    };
  }

  static navigationOptions = {
    title: 'Map',
  };


  componentWillMount() {
    this._getLocationAsync();
    // console.log("this.state.mapRegion");
    // console.log(this.state.mapRegion);
  }

  _handleMapRegionChange = newmapRegion => {
    this.setState({ newmapRegion });
  };
  
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

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ locationResult: 'Permission to access location was denied' });
    } else { this.setState({ hasLocationPermissions: true });    }
 
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });
    
    // Centers the map on the location fetched - takes abt 2000ms :/
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

    // console.log("maps");
    // console.log(this.state.mapRegion);

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
      
            initialRegion={
              this.state.mapRegion
                      }
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
      
            initialRegion={
              this.state.mapRegion
                      }
            onRegionChange={this._handleMapRegionChange}
          >

          <MapView.Marker
                coordinate={{latitude: this.state.latitude, longitude: this.state.longitude }}
                title={"You"}
                description={"Yes you"}
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
  para: {
    margin: 14,
    fontSize: 14,
    color: '#34495e',

  },
  loading:{
    alignSelf: "center",
    textAlign: 'center',
    fontSize: 14,
    color: '#34495e',
  },
  // miniTitle: {
  //   margin: 12,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   color: '#34495e',
  // },
  // txtIn: {
  //   fontSize: 12, 
  //   height: 50,
  //   fontSize: 18,
  // },
  // cities: { 
  //   padding: 5,
  //   fontSize: 20},

});
