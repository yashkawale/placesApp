import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PlaceItem = ({ place, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : styles.container
      }
    >
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.silver,
    borderWidth: 2,
    marginHorizontal: wp("5%"),
    marginVertical: hp("1%"),
    shadowColor: Colors.pink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    borderRadius: 8,
  },

  pressed: {
    opacity: 0.7,
  },

  image: {
    width: "80%",
    height: "100%",
    resizeMode: "cover",
    flex: 1,
    borderRadius: 8,
  },

  textContainer: {
    flex: 2,
    padding: wp("3%"),
    backgroundColor: Colors.silver,
  },

  title: {
    color: Colors.blue,
    fontSize: hp("3%"),
    textDecorationLine: "underline",
    marginBottom: 6,
    fontWeight: "bold",
  },

  address: {
    color: Colors.black,
    fontSize: hp("2%"),
    fontWeight: "500",
  },
});
