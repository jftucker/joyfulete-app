import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import Text from "../components/Text";
import useLocation from "../hooks/useLocation";

import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";

const LOCATION_TASK_NAME = "background-location-task";

const RecordButton = () => {
  const handlePress = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.BestForNavigation,
      });
    }
  };

  const handleStop = async () => {
    Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  };

  const onPress = () => {
    console.log("pressed.");
    handlePress();
  };

  const stopRecording = () => {
    console.log("stopped.");
    console.log(workout);
    handleStop();
  };

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Text>Start Recording</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={stopRecording}>
        <Text>Stop Recording</Text>
      </TouchableOpacity>
    </>
  );
};

let workout = [];

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { locations }, error }) => {
  if (error) {
    console.log(error.message);
    return;
  }
  console.log("Recieved new locations", locations);
  workout = [...workout, ...locations];
});

function ActivityRecordScreen() {
  // const location = useLocation();
  return (
    <View style={styles.detailsContainer}>
      {/* <Text>
        {location
          ? location.longitude + " " + location.latitude
          : "getting location..."}
      </Text> */}
      <RecordButton />
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
});

export default ActivityRecordScreen;
