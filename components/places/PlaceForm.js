import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Title</Text>
      </View>
      <TextInput style={styles.input} />
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp("5%"),
  },

  title: {
    color: Colors.yellow,
    fontSize: wp("4.5%"),
    fontWeight: "600",
  },

  input: {
    fontSize: wp("4.5%"),
    padding: wp("2%"),
    backgroundColor: Colors.lightYellow,
    marginVertical: hp("1%"),
    borderRadius: 6,
    shadowColor: Colors.yellow,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: wp("3%"),
    elevation: 4,
    fontWeight: "600",
  },
});
