import { FlatList, Platform, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { Button, Picker, TextField } from "react-native-ui-lib";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { TyresType } from "@/app/pickUp";
import { Stack } from "expo-router";

type Props = {
  tyres: TyresType[];
  onTyresChange: (value: TyresType[]) => void;
  goNext: () => void;
};

export default function InputTyres({ tyres, onTyresChange, goNext }: Props) {
  const [tireQuantity, setTireQuantity] = useState<string>("");
  const [tireType, setTireType] = useState<string>("Passenger");

  const onAddItem = () => {
    onTyresChange([...tyres, { id: String(tyres.length + 1), quantity: tireQuantity, type: tireType }]);
    setTireQuantity("");
    setTireType("");
  };

  const onRemoveItem = (id: string) => {
    onTyresChange(tyres.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Pick up",
          headerTitleAlign: "center",
          headerTitle: (props) => <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pick up</Text>,
          headerRight: () => null
        }}
      />
      <Text style={styles.title}>How many tyres do you have?</Text>
      <View>
        <FlatList
          style={{ width: "100%", paddingTop: 30 }}
          data={tyres}
          renderItem={({ item }) => (
            <Item id={item.id} quantity={item.quantity} type={item.type} onRemove={onRemoveItem} />
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.input}>
          <View style={styles.textField}>
            <TextField
              placeholder={"Quantity"}
              keyboardType="numeric"
              onChangeText={(value) => setTireQuantity(value)}
              value={tireQuantity}
            />

            <Picker
              value={tireType}
              useSafeArea={true}
              placeholder={"Type"}
              fieldType={"filter"}
              useWheelPicker
              onChange={(value: any) => {
                setTireType(value);
              }}
            >
              <Picker.Item label={""} key={0} value={""} />
              <Picker.Item label={"Passenger"} key={1} value={"Passenger"} />
              <Picker.Item label={"Light truck"} key={2} value={"Light truck"} />
              <Picker.Item label={"Truck "} key={3} value={"Truck"} />
              <Picker.Item label={"4x4"} key={4} value={"4x4"} />
            </Picker>
          </View>
          <Button disabled={!tireQuantity || !tireType} label={"+ Add"} enableShadow onPress={onAddItem} />
        </View>
      </View>

      <Button
        style={styles.button}
        disabled={tyres.length === 0}
        enableShadow
        round
        label={">"}
        onPress={() => goNext()}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const Item = ({
  id,
  quantity,
  type,
  onRemove
}: {
  id: string;
  quantity: string;
  type: string;
  onRemove: (id: string) => void;
}) => (
  <View style={styles.item}>
    <View style={styles.counter}>
      <Text style={styles.title}>{quantity}</Text>
      <Text style={styles.title}>{type}</Text>
    </View>
    <Text style={{ fontSize: 20 }} onPress={() => onRemove(id)}>
      X
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: "100%"
  },
  counter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#f9c2ff"
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    backgroundColor: "#f9c2ff",
    padding: 15,
    gap: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  input: {
    display: "flex",
    overflow: "hidden",
    borderColor: "black",
    padding: 10,
    borderWidth: 2,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10
  },
  textField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20
  }
});
