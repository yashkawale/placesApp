import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OutlineButton from "../../ui/OutlineButton";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  useForegroundPermissions,
  PermissionStatus,
  getCurrentPositionAsync,
} from "expo-location";

const LocationPicker = () => {
  const [locationPermissionStatus, requestPermission] =
    useForegroundPermissions();

  const verifyPermission = async () => {
    if (locationPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "Grant permission for the location access."
      );
      return false;
    }
    return true;
  };

  const handleLocation = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    console.log(location);
  };

  const handleMapPick = async () => {};

  return (
    <View>
      <View style={styles.mapContainer}></View>
      <View style={styles.buttonsContainer}>
        <OutlineButton
          title="Locate User"
          icon="location"
          size={24}
          color={Colors.blue}
          onPress={handleLocation}
        />
        <OutlineButton
          title="Pick on Map"
          icon="map"
          size={24}
          color={Colors.blue}
          onPress={handleMapPick}
        />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: Colors.black,
    width: "100%",
    height: hp("22%"),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: wp("3%"),
    shadowRadius: wp("3%"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowColor: Colors.lightGreen,
    borderWidth: 1,
    borderColor: Colors.green,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
