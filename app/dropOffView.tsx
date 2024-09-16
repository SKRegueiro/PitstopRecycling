import { FlatList, StyleSheet, View } from "react-native";
import { ListItem, Text } from "react-native-ui-lib";
import useSites from "@/lib/hooks/useSites";
import React from "react";
import useInTransitPickUps from "@/lib/hooks/useInTransitPickUps";
import dropPickUps from "@/services/pickups/dropPickUps";
import { router } from "expo-router";
import Routes from "@/constants/Routes";
import { ToastError, ToastSuccess } from "@/lib/utils/Toasts";
import ScreenView from "@/components/ScreenView";

const dropOffView = () => {
  const { sites } = useSites();
  const { pickUps } = useInTransitPickUps();

  const onSelect = async (siteId: number) => {
    const ids = pickUps?.map((pickUp) => pickUp.id);
    const { error } = await dropPickUps({ pickUpIds: ids || [], siteId });
    if (!error) {
      router.navigate(Routes.Home);
      ToastSuccess("Load dropped successfully");
    } else {
      ToastError("There was an error. Please try again later");
    }
  };

  return (
    <ScreenView>
      <Text center text30M>
        Choose a site
      </Text>
      <FlatList
        style={styles.list}
        data={sites}
        renderItem={({ item }) => (
          <ListItem onPress={() => onSelect(item.id)} style={styles.listItem}>
            <View style={styles.address}>
              <Text>{item.address} </Text>
            </View>
          </ListItem>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    paddingTop: 30
  },
  listItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    height: "auto"
  },
  address: {
    display: "flex",
    flexDirection: "column",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    borderRadius: 5
  }
});

export default dropOffView;
