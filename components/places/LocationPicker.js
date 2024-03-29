import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import MapPreview from "./MapPreview";
import { getGeocoding } from "../../utils/fetch-geocoding";

const LocationPicker = ({ onLocationPick }) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionStatus, requestPermission] =
    useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

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
    setPickedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        latitude: route.params.pickedLatitude,
        longitude: route.params.pickedLongitude,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [isFocused, route]);

  useEffect(() => {
    const handleLocationData = async () => {
      if (pickedLocation) {
        const address = await getGeocoding(
          pickedLocation.latitude,
          pickedLocation.longitude
        );
        onLocationPick({ ...pickedLocation, address: address });
      }
    };
    handleLocationData();
  }, [onLocationPick, pickedLocation]);

  const handleMapPick = () => {
    navigation.navigate("Map");
  };

  let LocationPreview = (
    <Text style={styles.fallBackText}>No location is picked yet!</Text>
  );

  if (pickedLocation) {
    LocationPreview = (
      <MapPreview
        latitude={pickedLocation.latitude}
        longitude={pickedLocation.longitude}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapContainer}>{LocationPreview}</View>
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
  container: {
    flex: 1,
  },

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

  fallBackText: {
    color: Colors.green,
  },
});
