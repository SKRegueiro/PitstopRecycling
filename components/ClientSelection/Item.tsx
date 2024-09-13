import { Checkbox, Chip, ListItem } from "react-native-ui-lib";
import { View } from "react-native";
import { Text } from "@rneui/base";
import React from "react";

const Item = ({
  id,
  email,
  address,
  business_name,
  signer_names,
  selectedId,
  onSelect
}: {
  id: number;
  email: string;
  address: string;
  business_name: string;
  signer_names: string[] | null;
  selectedId: number | undefined;
  onSelect: (id: number) => void;
}) => {
  return (
    <ListItem
      onPress={() => onSelect(id)}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 20,
        height: "auto"
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{business_name}</Text>
        <Text>{email}</Text>
        <Text>{address} </Text>
        <View>
          {signer_names &&
            signer_names.length &&
            signer_names.map((signer) => (
              <Chip containerStyle={{ width: "20%", marginTop: 5 }} key={signer} label={signer} />
            ))}
        </View>
      </View>
      <Checkbox value={selectedId === id} onValueChange={() => onSelect(id)} />
    </ListItem>
  );
};

export default Item;
