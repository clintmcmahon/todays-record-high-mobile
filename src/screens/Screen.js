import React from "react";
import { SafeAreaView, View } from "react-native";

export const Screen = (props) => {
  const { children } = props;
  const containerStyle = {
    flex: 1,
    backgroundColor: "#ffffff",
  };

  return <SafeAreaView style={containerStyle}>{children}</SafeAreaView>;
};

export default Screen;
