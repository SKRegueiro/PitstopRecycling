import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Button, PaperProvider } from "react-native-paper";
import React from "react";
import { router } from "expo-router";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <PaperProvider>
        <View style={styles.container}>
          <Button icon="truck" mode="contained" onPress={() => router.navigate("/pickUp")}>
            Pick up
          </Button>
          <Button icon="arrow-down" mode="contained" onPress={() => console.log("Pressed")}>
            Unload
          </Button>
        </View>
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    width: "40%",
    height: "20%"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
