import React from "react";
import { View } from "react-native";
import SetLocation from "../components/location/SetLocation";
import Screen from "./Screen";

function SettingsScreen({ navigation }) {
  return (
    <Screen>
      <View style={{ padding: 10 }}>
        <SetLocation navigation={navigation} />
      </View>
    </Screen>
  );
}

export default SettingsScreen;
