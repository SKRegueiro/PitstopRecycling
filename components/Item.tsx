import { Checkbox, Chip, ListItem } from "react-native-ui-lib";
import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/base";
import React from "react";

type Props = {
  id: number;
  email: string;
  address: string;
  business_name: string;
  signer_names: string[] | null;
  selectedId: number | undefined;
  onSelect: (id: number) => void;
};

const Item = ({ id, email, address, business_name, signer_names, selectedId, onSelect }: Props) => {
  const isSelected = selectedId === id;

  const onPress = () => onSelect(id);

  return (
    <ListItem onPress={onPress} style={styles.listItem}>
      <View style={styles.detailsContainer}>
        <Text style={styles.businessName}>{business_name}</Text>
        <Text>{email}</Text>
        <Text>{address}</Text>
        {signer_names?.map((signer) => <Chip key={signer} containerStyle={styles.chipContainer} label={signer} />)}
      </View>
      <Checkbox value={isSelected} onValueChange={onPress} />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    height: "auto"
  },
  detailsContainer: {
    flexDirection: "column"
  },
  businessName: {
    fontWeight: "bold"
  },
  chipContainer: {
    width: "20%",
    marginTop: 5
  }
});

export default Item;
