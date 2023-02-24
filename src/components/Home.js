import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from "react-native";
import * as locationService from "../services/LocationService";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";
import * as weatherDataService from "../services/WeatherDataService";
import { Link } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { changeDate } from "../actions/locations";
import DailyHistory from "./history/DailyHistory";

export default function Home() {
  const [dateName, setDateName] = useState();
  const [records, setRecords] = useState(null);
  const [normals, setNormals] = useState(null);
  const [dailyHistory, setDailyHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const state = useSelector((state) => state);
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    if (state.location) {
      getRecords();
    }
  }, [state.location, state.date]);

  const getRecords = async () => {
    const selectedStation = locationService.getStationIdByStateAndStationName(
      state.location.state,
      state.location.station
    );
    const today = new Date(state.date);
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const year = today.getFullYear();

    const shortDate = month + "-" + day;
    const longDate = year + "-" + month + "-" + day;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let monthName = months[today.getMonth()];
    setDateName(monthName + " " + day);

    setRecords(
      await weatherDataService.getRecords(
        selectedStation.sids[0],
        shortDate,
        shortDate
      )
    );

    setNormals(
      await weatherDataService.getNormals(
        selectedStation.sids[0],
        longDate,
        longDate
      )
    );

    setDailyHistory(
      await weatherDataService.getDailyHistory(
        selectedStation.sids[0],
        "1871-" + shortDate,
        longDate
      )
    );

    setIsLoading(false);
    setIsRefreshing(false);
  };

  const goBack = () => {
    const newDate = addDays(state.date, -1);
    dispatch(changeDate(newDate));
  };

  const goForward = () => {
    const newDate = addDays(state.date, 1);
    dispatch(changeDate(newDate));
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getRecords();
  };

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const resetDate = () => {
    dispatch(changeDate(new Date()));
  };

  if (!state.location) {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            You do not have a weather station selected.
          </Text>
          <Text style={{ color: theme.colors.linkBlue, paddingTop: 5 }}>
            <Link to={{ screen: "Settings" }}>Go to Settings</Link>
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{}}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.location}>
            {state.location.station.replace("Area", "")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 10,
              textAlign: "center",
            }}
          >
            <TouchableOpacity onPress={goBack} style={{ padding: 5 }}>
              <FontAwesome5
                name="backward"
                size={32}
                color={theme.colors.dark}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={resetDate}>
              <Text style={styles.date}>{dateName}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goForward} style={{ padding: 5 }}>
              <FontAwesome5
                name="forward"
                size={32}
                color={theme.colors.dark}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.weatherDataContainer}>
            <View style={styles.weatherData}>
              <Text style={styles.dataLabel}>
                Record High{" "}
                {records ? `(${records.highDate.getFullYear()})` : "--"}
              </Text>
              <Text style={styles.dataValue}>
                {isLoading ? "----" : records ? `${records.highTemp}℉` : "----"}
              </Text>
            </View>
            <View style={styles.weatherData}>
              <Text style={styles.dataLabel}>
                Record Low{" "}
                {records ? `(${records.lowDate.getFullYear()})` : "--"}
              </Text>
              <Text style={styles.dataValue}>
                {isLoading ? "----" : records ? `${records.lowTemp}℉` : "----"}
              </Text>
            </View>
          </View>
          <View style={styles.weatherDataContainer}>
            <View style={styles.weatherData}>
              <Text style={styles.dataLabel}>Normal High</Text>
              <Text style={styles.dataValue}>
                {isLoading ? "----" : normals ? `${normals.high}℉` : "----"}
              </Text>
            </View>
            <View style={styles.weatherData}>
              <Text style={styles.dataLabel}>Normal Low</Text>
              <Text style={styles.dataValue}>
                {isLoading ? "----" : normals ? `${normals.low}℉` : "----"}
              </Text>
            </View>
          </View>
          <View style={styles.weatherDataContainer}>
            <View style={styles.weatherData}>
              <Text style={styles.dataLabel}>
                Record Precip{" "}
                {records ? `(${records.precipDate.getFullYear()})` : "--"}
              </Text>
              <Text style={styles.dataValue}>
                {isLoading ? "----" : records ? `${records.precip}''` : "----"}
              </Text>
            </View>
            <View style={styles.weatherData}>
              <Text style={styles.dataLabel}>
                Record Snow{" "}
                {records ? `(${records.snowDate.getFullYear()})` : "--"}
              </Text>
              <Text style={styles.dataValue}>
                {isLoading ? "----" : records ? `${records.snow}''` : "----"}
              </Text>
            </View>
          </View>
          <Text style={styles.subHeading}>Daily history</Text>
          {dailyHistory ? <DailyHistory dailyHistory={dailyHistory} /> : ""}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    width: "90%",
  },
  location: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  weatherDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  weatherData: {
    flex: 1,
    alignItems: "center",
  },
  dataLabel: {
    fontSize: 14,
    color: "#aaa",
  },
  dataValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  additionalDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  additionalData: {
    flex: 1,
    alignItems: "center",
  },
  additionalDataLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  additionalDataValue: {
    fontSize: 14,
    color: "#555",
  },
  currentTemperatureContainer: {
    alignItems: "center",
  },
  currentTemperatureValueContainer: {
    backgroundColor: "#ff8c00",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 10,
    width: "50%",
  },
  currentTemperatureLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  currentTemperatureValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  highlightedCurrentTemperatureValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  subHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
