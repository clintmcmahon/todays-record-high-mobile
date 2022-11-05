import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";

function RecordCard({ leftTemp, leftTitle, rightTitle, rightTemp, hotCold }) {
  const theme = useTheme();
  const getRecord = () => {
    if (leftTemp !== null) {
      return (
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View>
            <Text
              style={{
                color:
                  hotCold === "hot" ? theme.colors.heat : theme.colors.cold,
                fontWeight: "bold",
              }}
            >
              {leftTitle.toUpperCase()}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                color: theme.colors.dark,
                marginTop: 5,
              }}
            >
              {leftTemp}℉
            </Text>
          </View>
          <View>
            <Text
              style={{
                color:
                  hotCold === "hot" ? theme.colors.heat : theme.colors.cold,
                fontWeight: "bold",
              }}
            >
              {rightTitle.toUpperCase()}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                color: theme.colors.dark,
                marginTop: 5,
              }}
            >
              {rightTemp}℉
            </Text>
          </View>
        </View>
      );
    } else {
      return <ActivityIndicator />;
    }
  };
  return (
    <View
      style={{
        backgroundColor: theme.colors.cardBackgroundColor,
        borderLeftColor:
          hotCold === "hot" ? theme.colors.heat : theme.colors.cold,
        borderLeftWidth: 5,
        padding: 20,
        borderRadius: 5,
      }}
    >
      {getRecord()}
    </View>
  );
}

export default RecordCard;
