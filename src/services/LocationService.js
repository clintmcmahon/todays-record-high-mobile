import AsyncStorage from "@react-native-async-storage/async-storage";
import stationData from "../data/stationData.json";

export const setLocation = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("location", jsonValue);
  } catch (e) {
    console.log(e); // saving error
  }
};
export const getLocation = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("location");
    if (jsonValue) {
      console.log("Found location:" + JSON.stringify(jsonValue));
    }
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("error");
  }
};

export const getStationsByState = (stateShortCode) => {
  const state = stationData.find(
    (state) => state.shortCode.toLowerCase() === stateShortCode.toLowerCase()
  );
  if (state) {
    return state.stations.filter((station) =>
      station.name.toLowerCase().endsWith("area")
    );
  }

  return null;
};

export const getStationIdByStateAndStationName = (state, stationName) => {
  const stations = getStationsByState(state);
  if (stations) {
    return stations.find(
      (station) => station.name.toLowerCase() === stationName.toLowerCase()
    );
  }

  return null;
};
