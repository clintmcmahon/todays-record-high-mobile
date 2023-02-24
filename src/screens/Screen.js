import React from "react";
import { SafeAreaView } from "react-native";

export const Screen = (props) => {
  const { children } = props;
  const safeAreaView = {
    flex: 1,
    backgroundColor: "#ffffff",
  };

  return <SafeAreaView style={safeAreaView}>{children}</SafeAreaView>;
};

export default Screen;
