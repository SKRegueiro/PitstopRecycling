import { FlatList, Keyboard, Platform, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { Button, Picker, TextField } from "react-native-ui-lib";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { TyresType } from "@/app/pickUpView";
import { Stack } from "expo-router";
import useMoveOnKeyboardOpen from "@/lib/hooks/useMoveOnKeyboardOpen";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  tyres: TyresType[];
  onTyresChange: (value: TyresType[]) => void;
  goNext: () => void;
};

export default function InputTyres({ tyres, onTyresChange, goNext }: Props) {
  const [tireQuantity, setTireQuantity] = useState<string>("");
  const [tireType, setTireType] = useState<string>("Passenger");
  const { bottom } = useMoveOnKeyboardOpen();

  const onAddItem = () => {
    Keyboard.dismiss();

    const existingTyreIndex = tyres.findIndex((tyre) => tyre.type === tireType);

    if (existingTyreIndex !== -1) {
      const updatedTyres = [...tyres];
      updatedTyres[existingTyreIndex].quantity =
        Number(updatedTyres[existingTyreIndex].quantity) + parseInt(tireQuantity);

      onTyresChange(updatedTyres);
    } else {
      const newTyre = { id: tyres.length + 1, quantity: parseInt(tireQuantity), type: tireType };

      onTyresChange([...tyres, newTyre]);
    }

    setTireQuantity("");
    setTireType("");
  };

  const onRemoveItem = (id: number) => {
    onTyresChange(tyres.filter((item) => item.id !== id));
  };

  return (
    <View style={{ ...styles.container, bottom }}>
      <View>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Pick up",
            headerTitleAlign: "center",
            headerTitle: () => <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pick up</Text>,
            headerRight: () => null
          }}
        />
        <Text style={styles.title}>How many tyres do you have?</Text>
        <View>
          <FlatList
            style={{ width: "100%", paddingTop: 50 }}
            data={tyres}
            renderItem={({ item }) => (
              <Item id={item.id} quantity={item.quantity} type={item.type} onRemove={onRemoveItem} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={styles.input}>
          <View style={styles.textField}>
            <TextField
              placeholder={"Quantity"}
              keyboardType="numeric"
              style={{ minWidth: "15%", color: "black" }}
              onChangeText={(value) => setTireQuantity(value)}
              placeholderTextColor={"#A9A9AC"}
              value={tireQuantity}
              returnKeyType={"done"}
            />

            <Picker
              value={tireType}
              useSafeArea={true}
              placeholder={"Type"}
              fieldType={"filter"}
              useWheelPicker
              onPress={() => Keyboard.dismiss()}
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
  id: number;
  quantity: number;
  type: string;
  onRemove: (id: number) => void;
}) => (
  <View style={styles.item}>
    <View style={styles.counter}>
      <Text style={styles.title}>{quantity}</Text>
      <Text style={styles.title}>{type}</Text>
    </View>
    <AntDesign onPress={() => onRemove(id)} name="closecircleo" size={24} color="black" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    padding: 10,
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
    color: "black !important",
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
