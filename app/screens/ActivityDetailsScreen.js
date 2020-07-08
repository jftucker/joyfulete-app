import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";

function ActivityDetailsScreen({ route }) {
  const activity = route.params;
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      {/* <Image
        style={styles.image}
        preview={{ uri: activity.images[0].thumbnailUrl }}
        uri={activity.images[0].url}
      /> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{activity.name}</Text>
        <Text style={styles.description}>{activity.description}</Text>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/john.jpg")}
            title={activity.user}
            subTitle="5 Listings"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  description: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ActivityDetailsScreen;
