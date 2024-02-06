import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../ui/IconButton";

const Map = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 21.146633,
    longitude: 79.08886,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const locationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, long: long });
  };

  const confirmLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "Pick a location by tapping on the map."
      );
      return;
    }
    navigation.navigate("AddPlaces", {
      pickedLatitude: selectedLocation.lat,
      pickedLongitude: selectedLocation.long,
    });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={confirmLocationHandler}
        />
      ),
    });
  }, [navigation, confirmLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={locationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.long,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
