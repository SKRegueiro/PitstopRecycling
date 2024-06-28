import React, { useRef } from "react";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";
import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/base";
import { Stack } from "expo-router";

interface Props {
  text: string;
  onOK: (signature: any) => void;
}

const Sign: React.FC<Props> = ({ text, onOK }) => {
  const ref = useRef<SignatureViewRef>(null);

  //TODO: check that there is a signature. Show summary screen or maybe add it to this view. Create receipt and send email.
  //ALso add name of the person who signed.

  const handleSignature = (signature: any) => {
    onOK(ref.current?.readSignature());
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Signature",
          headerTitleAlign: "center",
          headerTitle: () => <Text style={{ fontWeight: "bold", fontSize: 20 }}>Signature </Text>,
          headerRight: () => null
        }}
      />
      <SignatureScreen ref={ref} onOK={handleSignature} autoClear={true} descriptionText={text}></SignatureScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    padding: 10
  }
});

export default Sign;
