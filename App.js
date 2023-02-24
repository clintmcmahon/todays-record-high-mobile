import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import store from "./src/store/store";
import { WxLightTheme } from "./src/style/theme";
import RootNavigator from "./src/components/navigation/RootNavigator";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
