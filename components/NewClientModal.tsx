import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, PanningProvider, TextField } from "react-native-ui-lib";
import { Text } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";
import useMoveOnKeyboardOpen from "@/lib/hooks/useMoveOnKeyboardOpen";

//TODO: this could probably be shared and reduced with Client type
type ClientProps = {
  business_name: string;
  email: string;
  abn: string;
  address: string;
};

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSaveClient: (props: ClientProps) => void;
};

const NewClientModal = ({ isVisible, onClose, onSaveClient }: Props) => {
  const { bottom } = useMoveOnKeyboardOpen();
  const [clientInfo, setClientInfo] = useState<ClientProps>({ business_name: "", email: "", abn: "", address: "" });
  const isButtonDisabled = Object.values(clientInfo).some((value) => value === "");

  const onChange = (property: string) => (value: string) => setClientInfo({ ...clientInfo, [property]: value });

  return (
    <View>
      <Dialog
        visible={isVisible}
        onDismiss={onClose}
        containerStyle={{ ...styles.dialog, bottom }}
        panDirection={PanningProvider.Directions.DOWN}
        useSafeArea
      >
        <Text style={styles.title}>Add new client</Text>
        <View style={styles.info}>
          <TextField
            fieldStyle={styles.field}
            label={"Business Name"}
            value={clientInfo.business_name}
            onChangeText={onChange("business_name")}
          />
          <TextField
            validate={["email"]}
            value={clientInfo.email}
            fieldStyle={styles.field}
            label={"Email"}
            onChangeText={onChange("email")}
          />
          <TextField
            validate={["number"]}
            value={clientInfo.abn}
            fieldStyle={styles.field}
            label={"ABN"}
            onChangeText={onChange("abn")}
          />
          <TextField
            value={clientInfo.address}
            fieldStyle={styles.field}
            label={"Address"}
            onChangeText={onChange("address")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={{ paddingLeft: 25 }}
            label={"Save"}
            iconOnRight={true}
            disabled={isButtonDisabled}
            iconSource={() => <AntDesign style={{ paddingLeft: 5 }} name="check" size={20} color="white" />}
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
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 30
  },
  field: { borderBottomWidth: 1, borderBottomColor: "black" },
  title: { fontWeight: "bold", fontSize: 30, paddingBottom: 40 }
});

export default NewClientModal;
