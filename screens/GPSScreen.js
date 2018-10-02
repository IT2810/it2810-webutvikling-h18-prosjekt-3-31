import React from "react";
import { StyleSheet, View, Slider, Switch, Text } from "react-native";
import { MapView } from "expo";
import { SegmentedControls } from "react-native-radio-buttons"; // 1.0.0
import rawData from "./rawData";
import runKalmanOnLocations from "../placeholdersGPS/kalman";
import snappedPoints from "..placeholdersGPS/snappedPoints";
import badLocationData from '../placeholdersGPS/badLocationData'

const options = ["Raw Data", "Naive Solution", "Google Snap to Road", "Kalman"];
const regionToDisplay = {
  ...rawData[20],
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
};

export default class GPSScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedOption: "Raw Data",
      kalmanConstant: 500,
      firstValueBad: false,
    };
    this.getLocations = this.getLocations.bind(this);
    this.setSelectedOption = this.setSelectedOption.bind(this);
  }
  

  setSelectedOption = selectedOption => {
    this.setState({
      selectedOption
    });
  };

  getLocations = () => {
    let rawDataCopy = rawData.slice();
    const validLocations = rawDataCopy.filter(l => l.validation === "valid");

    if (this.state.firstValueBad) {
      rawDataCopy[0] = badLocationData
    }

    const kalmanSolution = runKalmanOnLocations(rawDataCopy, this.state.kalmanConstant);

    if (this.state.selectedOption === "Raw Data") {
      return rawDataCopy;
    } else if (this.state.selectedOption === "Naive Solution") {
      return validLocations;
    } else if (this.state.selectedOption === "Kalman") {
      return kalmanSolution;
    } else if (this.state.selectedOption === "Google Snap to Road") {
      return snappedPoints;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.container} region={regionToDisplay}>
          <MapView.Polyline strokeWidth={4} coordinates={this.getLocations()} />
        </MapView>
        <View style={styles.bottons}>
          {this.state.selectedOption === "Kalman" && (
            <View>
            <Text>Bad first value:</Text>
              <Switch
                onValueChange={firstValueBad => {
                  this.setState({ firstValueBad });
                }}
                value={this.state.firstValueBad}
              />
              <Slider
                step={100}
                maximumValue={2000}
                onValueChange={kalmanConstant => {
                  this.setState({
                    kalmanConstant: parseFloat(kalmanConstant)
                  });
                }}
                value={this.state.kalmanConstant}
              />
            </View>
          )}
          <SegmentedControls
            options={options}
            allowFontScaling={false} 
            onSelection={this.setSelectedOption}
            selectedOption={this.state.selectedOption}
            optionStyle={{ fontFamily: "AvenirNext-Medium" }}
            optionContainerStyle={{ flex: 1 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  bottons: {
    position: "absolute",
    // top: 0,
    left: 0,
    right: 0,
    bottom: 14
  }
});

// https://blog.expo.io/a-complete-guide-to-displaying-and-normalizing-location-data-in-react-native-7e448c760fc2