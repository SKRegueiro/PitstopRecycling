import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, DateTimePicker, TextField } from "react-native-ui-lib";
import insertFuel from "@/services/fuel/insertFuel";
import { CameraView, useCameraPermissions } from "expo-camera";
import Label from "react-native-ui-lib/src/components/textField/Label";
import { Entypo } from "@expo/vector-icons";

const FuelScreen = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

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
        <TextField style={styles.text} label={"Capture the ticket"}></TextField>
        <CameraView style={styles.camera} facing={"back"} ref={cameraRef} />
        <Button
          label={"Done"}
          onPress={async () => {
            const photo = await cameraRef?.current?.takePictureAsync();
            console.log(photo);
            setIsCameraOpen(false);
          }}
        ></Button>
      </View>
    );
  }

  if (!isCameraOpen) {
    return (
      <View style={styles.container}>
        <TextField style={styles.textField} label={"Amount paid ($)"} value={amount} onChangeText={setAmount} />
        <View style={styles.uploadButton}>
          <Label label={"Upload receipt"} />
          <DateTimePicker value={date} onChange={setDate} mode={"date"}></DateTimePicker>
          <Button label={"Upload"} onPress={() => setIsCameraOpen(true)}>
            <Entypo style={{ marginRight: 10 }} name="camera" size={24} color="white" />
          </Button>
          <Button label={"Submit"} disabled={!amount} onPress={() => onSubmit()}></Button>
        </View>
      </View>
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
  }
});

export default FuelScreen;
