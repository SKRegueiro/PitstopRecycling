import { StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { Button, ButtonSize, View } from "react-native-ui-lib";
import { router, Stack, useFocusEffect } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import useInTransitPickUps from "@/lib/hooks/useInTransitPickUps";
import Routes from "@/constants/Routes";
import StatsCard from "@/components/StatCard";

type Props = {
  profile: {
    created_at: string;
    email: string | null;
    name: string | null;
    type: string | null;
  };
};

export default function Home({ profile }: Props) {
  const { haveInTransitPickUps, tyresByType, refetch, isLoading } = useInTransitPickUps();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const goToDropOff = () => router.navigate(Routes.DropOff);
  const goToFuel = () => router.navigate(Routes.Fuel);
  // const goToPickUp = () => router.navigate(Routes.PickUp);
  const goToPickUp = () => router.navigate("/tyres");

  return (
    <View style={styles.container} useSafeArea>
      <Stack.Screen
        options={{
          title: "Home"
          // TODO: add schedule feature
          // headerRight: () => <FontAwesome5 name="clock" size={24} color="black" />
        }}
      />
      <StatsCard
        isLoading={isLoading}
        name={profile?.name}
        haveInTransitPickUps={haveInTransitPickUps}
        tyresByType={tyresByType}
      />

      <View style={styles.buttons}>
        <View style={styles.buttonRow}>
          <Button
            iconSource={() => <MaterialIcons name="download" size={24} color="white" style={styles.icon} />}
            onPress={goToDropOff}
            label={"Drop off"}
            size={ButtonSize.large}
            style={styles.largeButton}
            enableShadow
            borderRadius={5}
            disabled={!haveInTransitPickUps}
          />
          <Button
            iconSource={() => <MaterialCommunityIcons name="fuel" size={24} color="white" style={styles.icon} />}
            onPress={goToFuel}
            label={"Log fuel"}
            size={ButtonSize.large}
            style={styles.largeButton}
            enableShadow
            borderRadius={5}
          />
        </View>
        <View>
          <Button
            iconSource={() => <FontAwesome5 name="truck-loading" size={20} style={styles.icon} color="white" />}
            onPress={goToPickUp}
            label={"Pick up"}
            size={ButtonSize.large}
            style={styles.fullWidthButton}
            enableShadow
            borderRadius={5}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: 20,
    justifyContent: "space-between"
  },
  buttons: {
    marginBottom: 30,
    gap: 20
  },
  buttonRow: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  largeButton: {
    width: "45%",
    height: 80
  },
  fullWidthButton: {
    width: "100%",
    height: 80
  },
  icon: {
    marginRight: 10
  }
});
