import React, { useState } from "react";
import { Keyboard, Platform, StyleSheet, View } from "react-native";
import { Button, Dialog, PanningProvider, TextField } from "react-native-ui-lib";
import { Text } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";

type ClientProps = {
  name: string;
  email: string;
  abn: string;
  address: string;
};

const NewClientModal = ({
  isVisible,
  onClose,
  onSaveClient
}: {
  isVisible: boolean;
  onClose: () => void;
  onSaveClient: (props: ClientProps) => void;
}) => {
  const [clientInfo, setClientInfo] = useState<ClientProps>({
    name: "",
    email: "",
    abn: "",
    address: ""
  });

  const [bottom, setBottom] = React.useState(0);

  //TODO: should be a better way
  React.useEffect(() => {
    function onKeyboardChange(e: any) {
      if (e.endCoordinates.screenY < e.startCoordinates.screenY) setBottom(e.endCoordinates.height / 2);
      else setBottom(0);
    }

    if (Platform.OS === "ios") {
      const subscription = Keyboard.addListener("keyboardWillChangeFrame", onKeyboardChange);
      return () => subscription.remove();
    }

    const subscriptions = [
      Keyboard.addListener("keyboardDidHide", onKeyboardChange),
      Keyboard.addListener("keyboardDidShow", onKeyboardChange)
    ];
    return () => subscriptions.forEach((subscription) => subscription.remove());
  }, []);

  return (
    <View>
      <Dialog
        visible={isVisible}
        onDismiss={onClose}
        containerStyle={{ ...styles.dialog, bottom }}
        panDirection={PanningProvider.Directions.DOWN}
        useSafeArea
      >
        <Text style={{ fontWeight: "bold", fontSize: 30, paddingBottom: 40 }}>Add new client</Text>
        <View style={styles.info}>
          <TextField
            fieldStyle={{ borderBottomWidth: 1, borderBottomColor: "black" }}
            label={"Business Name"}
            value={clientInfo.name}
            onChangeText={(value: string) => setClientInfo({ ...clientInfo, name: value })}
          />
          <TextField
            validate={["email"]}
            value={clientInfo.email}
            fieldStyle={{ borderBottomWidth: 1, borderBottomColor: "black" }}
            label={"Email"}
            onChangeText={(value: string) => setClientInfo({ ...clientInfo, email: value })}
          />
          <TextField
            value={clientInfo.abn}
            fieldStyle={{ borderBottomWidth: 1, borderBottomColor: "black" }}
            label={"ABN"}
            onChangeText={(value: string) => setClientInfo({ ...clientInfo, abn: value })}
          />
          <TextField
            value={clientInfo.address}
            fieldStyle={{ borderBottomWidth: 1, borderBottomColor: "black" }}
            label={"Address"}
            onChangeText={(value: string) => setClientInfo({ ...clientInfo, address: value })}
          />
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingTop: 30
          }}
        >
          <Button
            label={"Save"}
            iconOnRight={true}
            disabled={
              clientInfo.name === "" || clientInfo.email === "" || clientInfo.abn === "" || clientInfo.address === ""
            }
            iconSource={() => <AntDesign style={{ paddingLeft: 10 }} name="check" size={20} color="white" />}
            onPress={() => onSaveClient(clientInfo)}
          />
        </View>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
    width: "100%",
    padding: 30,
    borderRadius: 20
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: 40
  }
});

export default NewClientModal;
