import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import ActivityCard from "../components/ActivityCard";
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
            <ActivityCard
              date={item.date}
              type={item.activity_type}
              title={item.name}
              user={item.user}
              subTitle={item.description}
              imageUrl={"../assets/map.jpg"}
              onPress={() => navigation.navigate(routes.ACTIVITY_DETAILS, item)}
              thumbnailUrl={"../assets/map.jpg"}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 5,
    backgroundColor: colors.light,
  },
});

export default ActivitiesScreen;
