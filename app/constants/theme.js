import { Dimensions } from "react-native";
const w_dimensions = Dimensions.get("window");
const s_dimensions = Dimensions.get("screen");

const w_height = w_dimensions.height;
const w_width = w_dimensions.width;
const s_height = s_dimensions.height;
const s_width = s_dimensions.width;

export const COLORS = {
  // Base Colors
  primary: "#023e8a",
  secondary: "#F1F2F6",
  orange: "#4cc9f0",
  blue: "#5C95FF",
  green: "#90be6d",
  red: "#D2042D",

  // Colors
  black: "#1E1F20",
  white: "#FFFFFF",

  lightGray: "#F5F5F6",
  lightGray2: "#F6F6F7",
  lightGray3: "#EFEFF1",
  lightGray4: "#F8F8F9",
  transparent: "transparent",
  darkgray: "#898C95",
};

export const SIZES = {
  // Global Sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // Font Sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // App Dimensions
  w_width,
  w_height,
  s_width,
  s_height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: "Roboto",
    fontSize: SIZES.largeTitle,
    lineHeight: 42,
  },
  h1: { fontFamily: "Roboto", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "Roboto",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Roboto",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Roboto",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Roboto",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "Roboto",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
