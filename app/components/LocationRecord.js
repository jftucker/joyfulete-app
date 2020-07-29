import React, { useEffect } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";

import { useDispatch, useSelector } from "react-redux";
import { addLocation, getLocations } from "../store/locations";
import Button from "./Button";
import Screen from "./Screen";
import { View, Text } from "react-native";

const LOCATION_TASK_NAME = "background-location-task";

const LocationRecord = () => {
  const dispatch = useDispatch();
  const locations = useSelector(getLocations);

  const trackUserLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.BestForNavigation,
      });
    }
  };

  const stopTrackUserLocation = async () => {
    Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  };

  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      console.log(data.locations[0]);
      const location = data.locations[0];
      dispatch(addLocation(location));
    }
  });

  return (
    <Screen>
      <Button title="start" onPress={() => trackUserLocation()} />
      <Button title="stop" onPress={() => stopTrackUserLocation()} />
      {locations.length > 0 && (
        <Text>
          {locations[locations.length - 1].coords.longitude},{" "}
          {locations[locations.length - 1].coords.latitude}
        </Text>
      )}
    </Screen>
  );
};

export default LocationRecord;
