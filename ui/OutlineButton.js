import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const OutlineButton = ({ onPress, icon, size, color, title }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [styles.button, styles.pressed] : styles.button
      }
    >
      <Ionicons name={icon} size={size} color={color} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 8,
    marginVertical: hp("2%"),
    borderColor: Colors.blue,
    borderWidth: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: wp("3%"),
    shadowColor: Colors.blue,
    backgroundColor: "black",
  },

  pressed: {
    opacity: 0.7,
  },

  title: {
    color: Colors.blue,
    fontWeight: "bold",
    fontSize: wp("4%"),
  },
});
