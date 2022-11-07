import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import * as locationService from "../services/LocationService";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";
import * as weatherDataService from "../services/WeatherDataService";
import { Link } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { changeDate } from "../actions/locations";

function Home() {
  const [dateName, setDateName] = useState();
  const [records, setRecords] = useState(null);
  const [normals, setNormals] = useState(null);
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
    const dateArray = state.date.split("-");

    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    const shortDate = month + "-" + day;
    const longDate = year + "-" + month + "-" + day;

    setDateName(
      new Date(state.date).toLocaleString("en-US", { month: "long" }) +
        " " +
        day
    );

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
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <Text
          style={{
            fontSize: 34,
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          {state.location.station.replace("Area", "")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 10,
            textAlign: "center",
          }}
        >
          <TouchableOpacity onPress={goBack} style={{ padding: 5 }}>
            <FontAwesome5 name="backward" size={32} color={theme.colors.dark} />
          </TouchableOpacity>
          <TouchableOpacity onPress={resetDate}>
            <Text
              style={{
                fontSize: 20,
                color: theme.colors.dark,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              {dateName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goForward} style={{ padding: 5 }}>
            <FontAwesome5 name="forward" size={32} color={theme.colors.dark} />
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: "#f4f4f4",
              borderBottomWidth: 1,
            }}
          />
        </View>
      </View>
      <View style={{ paddingTop: 20 }}>
        <View>
          <View
            style={{
              paddingBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 24,
              }}
            >
              {isLoading
                ? "RECORD HIGH"
                : `RECORD HIGH (${
                    records ? records.highDate.getFullYear() : "----"
                  })`}
            </Text>
            <Text style={{ paddingBottom: 5 }}>
              {records
                ? `(${
                    records.highTempPeriodOfRecord
                      ? `POR: ${records.highTempPeriodOfRecord.join(" - ")}`
                      : ""
                  })`
                : "----"}
            </Text>

            <Text
              style={{
                fontWeight: "900",
                fontSize: 42,
              }}
            >
              {isLoading ? "----" : records ? `${records.highTemp}℉` : "----"}
            </Text>
          </View>
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 24,
              }}
            >
              NORMAL HIGH
            </Text>
            <Text
              style={{
                fontWeight: "900",
                fontSize: 42,
              }}
            >
              {isLoading ? "----" : normals ? `${normals.high}℉` : "----"}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "#f4f4f4",
            borderBottomWidth: 1,
          }}
        />
        <View>
          <View
            style={{
              paddingTop: 25,
              padingBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 24,
              }}
            >
              {isLoading
                ? "RECORD LOW"
                : `RECORD LOW (${
                    records ? records.lowDate.getFullYear() : "----"
                  })`}
            </Text>
            <Text style={{ paddingBottom: 5 }}>
              {records
                ? `(${
                    records.lowTempPeriodOfRecord
                      ? `POR: ${records.lowTempPeriodOfRecord.join(" - ")}`
                      : ""
                  })`
                : "----"}
            </Text>
            <Text
              style={{
                fontWeight: "900",
                fontSize: 42,
              }}
            >
              {isLoading ? "----" : records ? `${records.lowTemp}℉` : "----"}
            </Text>
          </View>
          <View
            style={{
              paddingTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 24,
              }}
            >
              NORMAL LOW
            </Text>
            <Text
              style={{
                fontWeight: "900",
                fontSize: 42,
              }}
            >
              {isLoading ? "----" : normals ? `${normals.low}℉` : "----"}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Home;
