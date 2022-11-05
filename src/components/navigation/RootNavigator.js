import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import HomeScreen from "../../screens/HomeScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import AboutScreen from "../../screens/AboutScreen";

import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as locationService from "../../services/LocationService";
import { useSelector, useDispatch } from "react-redux";
import { changeLocation } from "../../actions/locations";

const Tab = createBottomTabNavigator();

function RootNavigator() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const getLocation = async () => {
      const location = await locationService.getLocation();
      if (location) {
        dispatch(changeLocation(location));
      }
    };

    if (!state.location) {
      getLocation();
    }
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? "black" : "gray";
          if (route.name === "Home") {
            iconName = "temperature-high";
          } else if (route.name === "Settings") {
            iconName = "cog";
          } else if (route.name === "About") {
            iconName = "info";
          }
          return <FontAwesome5 name={iconName} size={24} color={iconColor} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default RootNavigator;
