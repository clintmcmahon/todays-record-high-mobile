import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const WxLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    cardBackgroundColor: "#ffffff",
    heat: "#E63946",
    cold: "#457B9D",
    dark: "#323232",
    linkBlue: "#0000EE",
    bold: "#323232",
  },
};

export const WxDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    linkBlue: "#0000EE",
  },
};
