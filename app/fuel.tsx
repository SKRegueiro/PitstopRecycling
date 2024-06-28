import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, DateTimePicker, TextField } from "react-native-ui-lib";
import Label from "react-native-ui-lib/src/components/textField/Label";
import { Entypo } from "@expo/vector-icons";
import insertFuel from "@/services/fuel/insertFuel";

const FuelScreen = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const onSubmit = async () => {
    try {
      const result = await insertFuel({
        price: amount,
        createdAt: date.toString(),
        employeeId: "1"
      });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextField style={styles.textField} label={"Amount paid ($)"} value={amount} onChangeText={setAmount} />
      <View style={styles.uploadButton}>
        <Label label={"Upload receipt"} />
        {
          //TODO: configure camera permissions and disable upload button if not granted
        }
        <DateTimePicker value={date} onChange={setDate} mode={"date"}></DateTimePicker>
        <Button label={"Upload"}>
          <Entypo style={{ marginRight: 10 }} name="camera" size={24} color="white" />
        </Button>
        <Button label={"Submit"} disabled={!amount} onPress={() => onSubmit()}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 250,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column"
  },
  textField: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  uploadButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20
  },
  label: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  }
});

export default FuelScreen;
