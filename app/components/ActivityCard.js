import React, { useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";
import usersApi from "../api/users";

function ActivityCard({
  date,
  title,
  type,
  subTitle,
  imageUrl,
  user: userId,
  onPress,
  thumbnailUrl,
}) {
  const { data: user, error, loading, request: loadUser } = useApi(
    usersApi.getUser
  );

  useEffect(() => {
    loadUser(userId);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <Text style={styles.user} numberOfLines={1}>
            {user.username}
          </Text>
          <Text style={styles.date} numberOfLines={1}>
            {type}: {Date(Date.parse(date))}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
        </View>
        <Image
          style={styles.image}
          tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginBottom: 20,
    overflow: "hidden",
  },
  date: {},
  detailsContainer: {
    padding: 20,
    backgroundColor: colors.white,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.dark,
  },
  title: {
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 7,
  },
  user: {},
});

export default ActivityCard;
