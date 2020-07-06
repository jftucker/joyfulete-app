import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import activitiesApi from "../api/activities";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";

function ActivitiesScreen({ navigation }) {
  const { data: activities, error, loading, request: loadActivities } = useApi(
    activitiesApi.getActivities
  );

  useEffect(() => {
    loadActivities();
  }, []);
  console.log(activities[0]);
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <>
            <AppText>Couldn't retrieve activities.</AppText>
            <Button title="Retry" onPress={loadActivities} />
          </>
        )}
        <FlatList
          data={activities}
          keyExtractor={(activity) => activity.id}
          renderItem={({ item }) => (
            <Card
              title={item.name}
              subTitle={item.activity_type}
              // onPress={() => navigation.navigate(routes.ACTIVITY_DETAILS, item)}
              // thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ActivitiesScreen;
