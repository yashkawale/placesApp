import React, { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

const AllPlaces = ({ route }) => {
  const [placesData, setPlacesData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setPlacesData((currPlaces) => [...currPlaces, route.params.place]);
    }
  }, [isFocused, route]);
  return <PlacesList places={placesData} />;
};

export default AllPlaces;
