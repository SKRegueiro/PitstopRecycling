import { StyleSheet } from "react-native";
import React from "react";
import { Button, ButtonSize, Card, View } from "react-native-ui-lib";
import { router, Stack } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container} useSafeArea>
      <Stack.Screen
        options={{
          title: "Home",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      />

      <Card enableShadow height={"30%"} width={"30%"} style={styles.card} onPress={() => console.log("pressed")}>
        <Card.Section
          content={[{ text: "Card content here", text70: true, grey10: true }]}
          contentStyle={{ alignItems: "center" }}
        />
        <Card.Section
          content={[
            { text: "Sergio", text90: true, $textDefault: true },
            {
              text: "",
              text80: true,
              $textDefault: true
            },
            { text: "wix.to/A465c", text90: true, $textDisabled: true }
          ]}
        />
      </Card>
      <View style={styles.buttons}>
        <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row" }}>
          <Button
            // icon="arrow-down"
            onPress={() => console.log("Pressed")}
            label={"⬇️ Drop off"}
            size={ButtonSize.large}
            enableShadow
            borderRadius={5}
            iconOnRight
          ></Button>
          <Button
            // icon="arrow-down"
            onPress={() => router.navigate("/fuel")}
            label={"⛽️Fuel"}
            size={ButtonSize.small}
            enableShadow
            borderRadius={5}
            iconOnRight
          ></Button>
        </View>
        <View>
          <Button
            style={styles.bigButton}
            onPress={() => router.navigate("/pickUp")}
            label={"⬆️ Pick up"}
            borderRadius={5}
            size={ButtonSize.large}
            enableShadow
            iconOnRight
          ></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    height: "30%",
    width: "100%",
    backgroundColor: "#fff"
  },
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: 20,
    justifyContent: "space-between"
  },
  buttons: {
    marginBottom: 60,
    gap: 20
  },
  bigButton: { width: "100%" },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
