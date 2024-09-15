import { StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { Button, ButtonSize, View } from "react-native-ui-lib";
import { router, Stack, useFocusEffect } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import useInTransitPickUps from "@/lib/hooks/useInTransitPickUps";
import useProfile from "@/lib/hooks/useProfile";
import Routes from "@/constants/Routes";
import StatsCard from "@/components/StatCard";

export default function Home() {
  const { haveInTransitPickUps, tyresByType, refetch } = useInTransitPickUps();
  const { profile } = useProfile();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <View style={styles.container} useSafeArea>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <FontAwesome5 name="clock" size={24} color="black" />
        }}
      />
      <StatsCard name={profile?.name} haveInTransitPickUps={haveInTransitPickUps} tyresByType={tyresByType} />

      <View style={styles.buttons}>
        <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row" }}>
          <Button
            iconSource={() => <MaterialIcons name="download" size={24} color="white" style={{ marginRight: 10 }} />}
            onPress={() => router.navigate(Routes.DropOff)}
            label={"Drop off"}
            size={ButtonSize.large}
            style={{ width: "45%", height: 80 }}
            enableShadow
            borderRadius={5}
            disabled={!haveInTransitPickUps}
          />
          <Button
            iconSource={() => (
              <MaterialCommunityIcons style={{ marginRight: 10 }} name="fuel" size={24} color="white" />
            )}
            onPress={() => router.navigate(Routes.Fuel)}
            label={"Log fuel"}
            style={{ width: "45%", height: 80 }}
            size={ButtonSize.large}
            enableShadow
            borderRadius={5}
          />
        </View>
        <View>
          <Button
            iconSource={() => <FontAwesome5 name="truck-loading" size={20} style={{ marginRight: 10 }} color="white" />}
            style={{ width: "100%", height: 80 }}
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
  bigButton: {},
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
