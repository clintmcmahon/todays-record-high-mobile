import React from "react";
import {
  View,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import Screen from "./Screen";
import { useTheme } from "@react-navigation/native";

function SettingsScreen({ navigation }) {
  const theme = useTheme();

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 10, paddingBottom: 50 }}
      >
        <View>
          <View>
            <Text
              style={{
                fontSize: 34,
                fontWeight: "900",
              }}
            >
              About
            </Text>
            <View style={{ paddingTop: 24 }}>
              <Text selectable={true} style={{ fontSize: 17 }}>
                Utilizing data provided by the Regional Climate Centers Applied
                Climate Information System web service this app displays record
                high, low and normal temperatures for a given date from weather
                stations across the United States.
              </Text>
            </View>
            <View style={{ paddingTop: 10 }}>
              <Text selectable={true} style={{ fontSize: 17 }}>
                Navigate between dates by pressing the arrows on either side of
                the displayed date.
              </Text>
            </View>
            <View style={{ paddingTop: 15 }}>
              <Text
                selectable={true}
                style={{ fontWeight: "700", fontSize: 22 }}
              >
                Data sources
              </Text>
            </View>
            <View style={{ paddingTop: 15 }}>
              <Text selectable={true} style={{ fontSize: 17 }}>
                Data for this app comes from the Regional Climate Centers -
                Applied Climate Information System and the queries were built
                using xmACIS2 Query Builder. All normals used in xmACIS are for
                the period 1991-2020.
              </Text>
              <Text selectable={true} style={{ paddingTop: 10, fontSize: 17 }}>
                The available weather stations are made of up different ThreadEx
                (Threaded Extremes) stations. These stations take weather data
                recorded at National Weather Service Automated Surface Observing
                Stations (ASOS) and merges the data together with other nearby
                data to create a single data set of weather information.{" "}
              </Text>
              <View style={{ paddingTop: 15 }}>
                <Text
                  selectable={true}
                  style={{ fontWeight: "700", fontSize: 22 }}
                >
                  Important links
                </Text>
              </View>
              <View>
                <Text
                  selectable={true}
                  style={{ paddingTop: 10, fontSize: 17 }}
                >
                  To learn more about ThreadEx and how this data is compiled:
                </Text>
                <TouchableOpacity
                  style={{ paddingTop: 5 }}
                  onPress={() => {
                    Linking.openURL(
                      "http://threadex.rcc-acis.org/help/about.html"
                    );
                  }}
                >
                  <Text
                    selectable={true}
                    style={{ color: theme.colors.linkBlue, fontSize: 17 }}
                  >
                    Methodology for Developing Threads
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  selectable={true}
                  style={{ paddingTop: 10, fontSize: 17 }}
                >
                  Detailed information about the RCC ACIS:{" "}
                </Text>
                <TouchableOpacity
                  style={{ paddingTop: 5 }}
                  onPress={() => {
                    Linking.openURL(
                      "https://www.rcc-acis.org/aboutacis_overview.html"
                    );
                  }}
                >
                  <Text
                    selectable={true}
                    style={{ color: theme.colors.linkBlue, fontSize: 17 }}
                  >
                    Applied Climate Information System website
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  selectable={true}
                  style={{ paddingTop: 10, fontSize: 17 }}
                >
                  For bugs, feature requests, complaints or coffee
                  recommendations, please create a GitHub issue or contact me
                  at:{" "}
                </Text>
                <TouchableOpacity
                  style={{ paddingTop: 5 }}
                  onPress={() => {
                    Linking.openURL("mailto:clintmcmahon@pm.me");
                  }}
                >
                  <Text
                    selectable={true}
                    style={{ color: theme.colors.linkBlue, fontSize: 17 }}
                  >
                    Email - clintmcmahon@pm.me
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingTop: 5 }}
                  onPress={() => {
                    Linking.openURL("https://twitter.com/cwmcmhn");
                  }}
                >
                  <Text
                    selectable={true}
                    style={{ color: theme.colors.linkBlue, fontSize: 17 }}
                  >
                    Twitter - @cwmcmhn
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingTop: 5 }}
                  onPress={() => {
                    Linking.openURL(
                      "https://github.com/clintmcmahon/todays-record-high-mobile/issues"
                    );
                  }}
                >
                  <Text
                    selectable={true}
                    style={{ color: theme.colors.linkBlue, fontSize: 17 }}
                  >
                    GitHub - Create Issue / View Repository
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

export default SettingsScreen;
