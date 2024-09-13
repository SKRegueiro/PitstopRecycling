import { StyleSheet } from "react-native";
import React from "react";
import { Button, ButtonSize, Text, View } from "react-native-ui-lib";
import { router, Stack } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import useInTransitPickUps from "@/lib/hooks/useInTransitPickUps";
import Card from "@/components/Card";
import useProfile from "@/lib/hooks/useProfile";
import Routes from "@/constants/Routes";
import { useFocusEffect } from "@react-navigation/core";

export default function Home() {
  const { haveInTransitPickUps, tyresByType, refetch } = useInTransitPickUps();
  const { profile } = useProfile();

  useFocusEffect(() => {
    refetch();
  });

  return (
    <View style={styles.container} useSafeArea>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <FontAwesome5 name="clock" size={24} color="black" />
        }}
      />
      <Card>
        <Text text30R>{profile?.name}</Text>
        {haveInTransitPickUps ? (
          <View>
            <Text>Current load:</Text>
            <Text>{Object.keys(tyresByType!).map((key) => `\n${[key]}: ${tyresByType[key]} `)}</Text>
          </View>
        ) : (
          <View>
            <Text> Empty truck</Text>
          </View>
        )}
        <View></View>
      </Card>
      <View style={styles.buttons}>
        <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row" }}>
          <Button
            iconSource={() => <MaterialIcons name="download" size={24} color="white" style={{ marginRight: 10 }} />}
            onPress={() => router.navigate(Routes.DropOff)}
            label={"Drop off"}
            size={ButtonSize.large}
            style={{ height: 80 }}
            enableShadow
            borderRadius={5}
            disabled={!haveInTransitPickUps}
          />
          <Button
            iconSource={() => (
              <MaterialCommunityIcons style={{ marginRight: 10 }} name="fuel" size={24} color="white" />
            )}
            onPress={() => router.navigate(Routes.Fuel)}
            label={"Fuel"}
            style={{ height: 80 }}
            size={ButtonSize.small}
            enableShadow
            borderRadius={5}
          />
        </View>
        <View>
          <Button
            iconSource={() => <FontAwesome5 name="truck-loading" size={20} style={{ marginRight: 10 }} color="white" />}
            style={styles.bigButton}
            onPress={() => router.navigate(Routes.PickUp)}
            label={"Pick up"}
            borderRadius={5}
            size={ButtonSize.large}
            enableShadow
          />
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
  bigButton: { width: "100%", height: 80 },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
