import { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";

const MapPreview = ({ latitude, longitude }) => {
  const [staticMapImageUrl, setStaticMapImageUrl] = useState(null);

  useEffect(() => {
    const fetchStaticMap = async () => {
      try {
        const locationIQApiKey = "pk.031cdf077ef6b18cbb354b78c113d9ea";
        const response = await fetch(
          `https://maps.locationiq.com/v3/staticmap?key=${locationIQApiKey}&center=${latitude},${longitude}&zoom=16&size=600x600&format=jpg&markers=icon:large-red-cutout%7C${latitude},${longitude}`
        );
        const imageUrl = response.url;
        setStaticMapImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching LocationIQ Static Map:", error);
      }
    };

    fetchStaticMap();
  }, [latitude, longitude]);

  return (
    <Image
      style={styles.mapImage}
      source={{
        uri: staticMapImageUrl,
      }}
    />
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapImage: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
});
