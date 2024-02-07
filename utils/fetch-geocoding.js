const locationIQApiKey = "pk.031cdf077ef6b18cbb354b78c113d9ea";

export const getGeocoding = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=${locationIQApiKey}&lat=${latitude}&lon=${longitude}&format=json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch geocode!");
    }

    const data = await response.json();
    return data.display_name;
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    throw error;
  }
};
