import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 32,
    round: 999,
  },
  iconSize: {
    xs: 16,
    s: 20,
    m: 24,
    l: 32,
    xl: 40,
  },
};

export default layout;