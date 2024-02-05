import { View, Button, Alert, Image, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import OutlineButton from "../../ui/OutlineButton";

const ImagePicker = () => {
  const [cameraPermissionStatus, requestPermission] = useCameraPermissions();
  const [imageSource, setImageSource] = useState();

  const verifyCameraPermission = async () => {
    if (cameraPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "Grant permission for the camera access."
      );
      return false;
    }
    return true;
  };

  const captureImage = async () => {
    const hasPermission = await verifyCameraPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImageSource(image.assets[0].uri);
  };

  let imagePreview = (
    <Text style={styles.imageFallBackText}>No photo to preview.</Text>
  );

  if (imageSource) {
    imagePreview = <Image style={styles.image} source={{ uri: imageSource }} />;
  }
  return (
    <View>
      <OutlineButton
        icon="camera"
        size={24}
        color={Colors.blue}
        title="Take Image"
        onPress={captureImage}
      />
      <View style={styles.imageContainer}>{imagePreview}</View>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imageContainer: {
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

  image: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },

  imageFallBackText: {
    color: Colors.green,
  },
});
