import { View, Text, Pressable, Image } from "react-native";
import React from "react";

const PlaceItem = ({ place, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;
