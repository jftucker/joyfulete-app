import React, { useState } from "react";
import { View, StyleSheet, Keyboard, Alert } from "react-native";
import * as Yup from "yup";

import messagesApi from "../api/messages";
import { Notifications } from "expo";
import { Form, FormField, SubmitButton, ErrorMessage } from "./forms";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().label("Message"),
});

const ContactSellerForm = ({ listing }) => {
  const [error] = useState();

  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert("Error", "Could not send message to the");
    }

    resetForm();

    Notifications.presentLocalNotificationAsync({
      title: "Awesome!",
      body: "Your message was sent to the seller.",
    });
  };

  return (
    <Form
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <ErrorMessage error={error} visible={error} />
      <FormField
        maxLength={255}
        multiline
        name="message"
        placeholder="Message..."
      />
      <SubmitButton title="Contact Seller" />
    </Form>
  );
};

export default ContactSellerForm;
