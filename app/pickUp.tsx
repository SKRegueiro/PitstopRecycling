import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";

export default function ModalScreen() {
  const [tyres, setTyres] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PickUp</Text>

      <Text>How many tires do you have?</Text>
      <TextInput
        placeholder={"Enter number here"}
        keyboardType="numeric"
        autoFocus={true}
        onChangeText={(value) => setTyres(value)}
        value={tyres}
      />
      <StatusBar style="auto" />
      <Button
        disabled={!tyres}
        onPress={() => alert(tyres)}
        icon={"send"}
        mode={"contained"}
        contentStyle={{ flexDirection: "row-reverse" }}
      >
        Confirm
      </Button>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
