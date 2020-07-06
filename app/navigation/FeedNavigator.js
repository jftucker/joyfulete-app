import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ActivityDetailsScreen from "../screens/ActivityDetailsScreen";
import ActivitiesScreen from "../screens/ActivitiesScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Activities" component={ActivitiesScreen} />
    <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
