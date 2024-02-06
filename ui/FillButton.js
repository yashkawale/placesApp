import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FillButton = ({ onPress, title }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [styles.button, styles.pressed] : styles.button
      }
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default FillButton;

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
    backgroundColor: Colors.blue,
  },

  pressed: {
    opacity: 0.7,
  },

  title: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: wp("4%"),
  },
});
