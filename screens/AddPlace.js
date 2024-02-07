import React from "react";
import PlaceForm from "../components/places/PlaceForm";
import { insertPlace } from "../utils/database";

const AddPlace = ({ navigation }) => {
  const handleCreatePlace = async (place) => {
    // console.log(place);
    // console.log("start");
    await insertPlace(place);
    // console.log("stop");

    // console.log("start");
    // await insertPlace(place)
    //   .then((result) => {
    //     console.log("Place inserted successfully:", result);
    //   })
    //   .catch((error) => {
    //     console.error("Error inserting place:", error);
    //   });
    // console.log("stop");

    // try {
    //   await insertPlace(place);
    //   console.log("stop");
    //   navigation.navigate("AllPlaces", { place: place });
    // } catch (error) {
    //   console.error("Error inserting place:", error);
    //   // Handle error appropriately, e.g., display an error message to the user
    // }

    navigation.navigate("AllPlaces", { place: place });
  };
  return <PlaceForm onCreatePlace={handleCreatePlace} />;
};

export default AddPlace;
