import { StyleSheet, View } from "react-native";

const ScreenView = ({ children, style }: { children: React.ReactNode; style?: any }) => {
  return <View style={{ ...styles.screen, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
    padding: 20
  }
});

export default ScreenView;
