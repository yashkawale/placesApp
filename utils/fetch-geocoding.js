import axios from "axios";
const locationIQApiKey = "pk.031cdf077ef6b18cbb354b78c113d9ea";

export const getGeocoding = async (latitude, longitude) => {
  const response = await fetch(
    `https://us1.locationiq.com/v1/reverse?key=${locationIQApiKey}&lat=${latitude}&lon=${longitude}`
  );
  //   const response = await axios.get(
  //     `https://us1.locationiq.com/v1/reverse?key=${locationIQApiKey}&lat=${latitude}&lon=${longitude}`
  //   );

  if (!response.ok) {
    throw new Error("Failed to fetch geocode!");
  }
  return response;
};
