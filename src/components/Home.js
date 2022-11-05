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
  const [recordHighsAndLows, setRecordHighsAndLows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const state = useSelector((state) => state);
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.location) {
      getRecords();
    }
  }, [state.location, state.date]);

  const getRecords = async () => {
    const selectedStation = locationService.getStationIdByStateAndStationName(
      state.location.state,
      state.location.station
    );
    const date = new Date(state.date);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const shortDate = month + "-" + day;
    const longDate = year + "-" + month + "-" + day;

    setDateName(date.toLocaleString("en-US", { month: "long" }) + " " + day);

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

    setRecordHighsAndLows(
      await weatherDataService.getRecordHighsAndLows(
        selectedStation.sids[0],
        shortDate
      )
    );

    setIsLoading(false);
  };

  const goBack = () => {
    setIsLoading(true);
    //const newDate = state.date ;
    //dispatch(changeDate(newDate));
  };

  const goForward = () => {
    setIsLoading(true);
    //const newDate = state.date.addDays(1);
    //dispatch(changeDate(newDate));
  };

  const onRefresh = useCallback(() => {
    console.log("refreshing");
    setIsRefreshing(true);
    setIsLoading(true);
    getRecords();
  }, []);

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
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
      <View>
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
              <FontAwesome5
                name="backward"
                size={32}
                color={theme.colors.dark}
              />
            </TouchableOpacity>
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
            <TouchableOpacity onPress={goForward} style={{ padding: 5 }}>
              <FontAwesome5
                name="forward"
                size={32}
                color={theme.colors.dark}
              />
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
      </View>
    </ScrollView>
  );
}

export default Home;
