import React, { useRef, useState } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, DateTimePicker, Modal, NumberInput, NumberInputData, Text, TextField } from "react-native-ui-lib";
import { CameraView, useCameraPermissions } from "expo-camera";
import Label from "react-native-ui-lib/src/components/textField/Label";
import { Entypo } from "@expo/vector-icons";
import ImageViewer from "@/components/ImageViewer";
import useProfile from "@/lib/hooks/useProfile";
import { router } from "expo-router";
import Routes from "@/constants/Routes";
import { CameraCapturedPicture } from "expo-camera/src/Camera.types";
import useUploadFuel from "@/lib/hooks/useUploadFuel";
import { ToastError, ToastSuccess } from "@/lib/utils/Toasts";
import ScreenView from "@/components/ScreenView";
import LoadingModal from "@/components/LoadingModal";

const Fuel = () => {
  const cameraRef = useRef<CameraView | null>(null);
  const { uploadFuel, loading } = useUploadFuel();
  const { profile } = useProfile();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [picture, setPicture] = useState<CameraCapturedPicture | undefined>(undefined);

  const onSubmit = async () => {
    try {
      await uploadFuel({ amount, date, base64: picture?.base64, userId: profile?.id.toString() });
      ToastSuccess("Your ticket fuel has been uploaded!");
      router.navigate(Routes.Home);
    } catch (error) {
      console.log(error);
      ToastError("Something went wrong. Try again later");
    }
  };

  const onTakePicture = async () => {
    if (cameraRef.current) {
      await cameraRef.current
        ?.takePictureAsync({ base64: true })
        .then((photo: CameraCapturedPicture | undefined) => setPicture(photo))
        .catch((error) => console.log(error))
        .finally(() => setIsCameraOpen(false));
    }
  };

  const onRemovePicture = () => {
    setPicture(undefined);
  };

  const onPressOutsideKeyboard = () => {
    Keyboard.dismiss();
  };

  if (!permission || !permission.granted) {
    return (
      <ScreenView>
        <TextField style={styles.message} label={"We need your permission to show the camera"} />
        <Button enableShadow onPress={requestPermission} label="Grant permission" />
      </ScreenView>
    );
  }

  return (
    <TouchableWithoutFeedback style={styles.fullScreen} onPress={onPressOutsideKeyboard} accessible={false}>
      <View style={styles.container}>
        <Modal animationType="slide" transparent={false} visible={isCameraOpen && permission.granted}>
          <ScreenView>
            <Text style={styles.text}>Capture the ticket clearly</Text>
            <CameraView style={styles.camera} facing={"back"} ref={cameraRef} />
            <Button enableShadow label={"Done"} onPress={onTakePicture} />
          </ScreenView>
        </Modal>

        <LoadingModal isLoading={loading} />

        <ScreenView>
          <View style={styles.inputs}>
            <View style={styles.uploadButton}>
              <Label labelStyle={styles.label} label={"Amount paid"} />
              <NumberInput
                textFieldProps={{ style: styles.textField, maxLength: 5 }}
                leadingText={"$"}
                fractionDigits={2}
                leadingTextStyle={styles.leadingText}
                onChangeNumber={(input: NumberInputData) => setAmount(input.userInput)}
              />
            </View>
            <View style={styles.uploadButton}>
              <Label labelStyle={styles.label} label={"Date"} />
              <DateTimePicker style={styles.textField} value={date} onChange={setDate} mode={"date"} />
            </View>
          </View>
          <ImageViewer path={picture?.uri} onRemove={onRemovePicture} />
          <Button
            enableShadow
            label={!picture ? "Receipt proof" : "Change photo"}
            onPress={() => setIsCameraOpen(true)}
          >
            <Entypo style={styles.cameraIcon} name="camera" size={24} color="white" />
          </Button>
          <Button
            enableShadow
            style={styles.submitButton}
            borderRadius={5}
            label={"Submit"}
            disabled={!amount || !picture || loading}
            onPress={onSubmit}
          />
        </ScreenView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    height: "100%",
    width: "100%"
  },
  container: {
    flex: 1
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
    fontSize: 15
  },
  message: {
    textAlign: "center",
    paddingBottom: 10
  },
  camera: {
    height: "60%",
    width: "100%"
  },
  cameraIcon: {
    marginRight: 10
  },
  submitButton: {
    width: "90%",
    height: 80
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  inputs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});

export default Fuel;
