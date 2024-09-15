import { FlatList, View } from "react-native";
import { ListItem, Text } from "react-native-ui-lib";
import useSites from "@/lib/hooks/useSites";
import React from "react";
import useInTransitPickUps from "@/lib/hooks/useInTransitPickUps";
import dropPickUps from "@/services/pickups/dropPickUps";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import Routes from "@/constants/Routes";

const dropOffView = () => {
  const { sites } = useSites();
  const { pickUps } = useInTransitPickUps();

  const onSelect = async (siteId: number) => {
    try {
      const ids = pickUps?.map((pickUp) => pickUp.id);
      const { error } = await dropPickUps({ pickUpIds: ids ? ids : [], siteId: siteId });
      if (error) throw error;

      router.navigate(Routes.Home);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Load dropped successfully"
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error?.message
        });
      }
    }
  };

  return (
    <View>
      <Text center text30M>
        Choose a site
      </Text>
      <FlatList
        style={{ width: "100%", paddingTop: 30 }}
        data={sites}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => onSelect(item.id)}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
              height: "auto"
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                borderColor: "black",
                borderWidth: 1,
                width: "100%",
                padding: 10,
                borderRadius: 5
              }}
            >
              {/*<Text>{item.alias}</Text>*/}
              <Text>{item.address} </Text>
            </View>
          </ListItem>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default dropOffView;
