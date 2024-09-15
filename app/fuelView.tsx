import { decode } from "base64-arraybuffer";
import React, { useRef, useState } from "react";
import { Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Button, DateTimePicker, NumberInput, NumberInputData, TextField } from "react-native-ui-lib";
import { CameraView, useCameraPermissions } from "expo-camera";
import Label from "react-native-ui-lib/src/components/textField/Label";
import { Entypo } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import insertFuel from "@/services/fuel/insertFuel";

const FuelView = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [picture, setPicture] = useState(null);

  const onSubmit = async () => {
    try {
      supabase.storage
        .from("public_fuel")
        .upload("picture" + date, decode(picture?.base64), {
          contentType: "image/png",
          upsert: false
        })
        .then(async (bucketResult) => {
          await insertFuel({
            createdAt: date.toISOString(),
            employeeId: "1",
            receiptImageId: bucketResult?.data?.id,
            cost: amount
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (!permission || !permission.granted) {
    return (
      <View style={styles.container}>
        <TextField style={styles.message} label={"We need your permission to show the camera"}></TextField>
        <Button onPress={requestPermission} label="Grant permission" />
      </View>
    );
  }

  //TODO: upload picture. need to convert to base64. show picture on app so they can check its correct. Add also a upload from library option. see if paid or not
  if (isCameraOpen && permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Capture the ticket </Text>
        <CameraView style={styles.camera} facing={"back"} ref={cameraRef} />
        <Button
          label={"Done"}
          onPress={async () => {
            await cameraRef?.current
              ?.takePictureAsync({ base64: true })
              .then((photo) => setPicture(photo))
              .catch((error) => console.log(error))
              .finally(() => setIsCameraOpen(false));
          }}
        ></Button>
      </View>
    );
  }

  if (!isCameraOpen) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.inputs}>
            <View style={styles.uploadButton}>
              <Label labelStyle={{ fontSize: 15 }} label={"Amount paid"} />
              <NumberInput
                textFieldProps={{ style: styles.textField, maxLength: 5 }}
                leadingText={"$"}
                fractionDigits={2}
                leadingTextStyle={styles.leadingText}
                onChangeNumber={(input: NumberInputData) => setAmount(input.userInput)}
              />
            </View>
            <View style={styles.uploadButton}>
              <Label labelStyle={{ fontSize: 15 }} label={"Date"} />
              <DateTimePicker style={styles.textField} value={date} onChange={setDate} mode={"date"}></DateTimePicker>
            </View>
          </View>
          {picture && <Image style={{ width: 200, height: 200 }} source={{ uri: picture?.uri }} />}
          <Button label={"Photo receipt"} onPress={() => setIsCameraOpen(true)}>
            <Entypo style={{ marginRight: 10 }} name="camera" size={24} color="white" />
          </Button>
          <Button label={"Submit"} disabled={!amount} onPress={() => onSubmit()} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
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
    borderBottomWidth: 1,
    width: 100,
    textAlign: "right",
    fontSize: 20
  },
  leadingText: {
    fontSize: 20
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
  },
  message: {
    textAlign: "center",
    paddingBottom: 10
  },
  camera: {
    flex: 0.5,
    width: "100%"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center"
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  },
  inputs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});

export default FuelView;
