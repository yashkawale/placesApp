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
    margin: 4,
  },

  pressed: {
    opacity: 0.7,
  },

  title: {
    color: Colors.blue,
    fontWeight: "600",
    fontSize: wp("4%"),
  },
});
