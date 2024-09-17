import React, { useRef, useState } from "react";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";
import { ScrollView, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { ListItem, Text } from "react-native-ui-lib";
import LoadingModal from "@/components/LoadingModal";

//TODO: improved typing
interface Props {
  selectedClient?: any;
  onOK: (signature: any) => void;
  tyres: any;
  isLoading: boolean;
}

const Sign = ({ selectedClient, onOK, tyres, isLoading }: Props) => {
  const ref = useRef<SignatureViewRef>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleSubmit = (signature: any) => {
    onOK(signature);
  };

  return (
    <ScrollView contentInset={{ bottom: 100 }} scrollEnabled={scrollEnabled} contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Signature",
          headerTitleAlign: "center",
          headerTitle: () => <Text style={{ fontWeight: "bold", fontSize: 20 }}>Signature </Text>,
          headerRight: () => null
        }}
      />
      <View style={styles.text}>
        <Text text40R>Client:</Text>
        <Text text80R>{selectedClient.business_name}</Text>
      </View>
      <View>
        <Text text40R style={{ alignSelf: "flex-start", marginBottom: 5, borderBottomWidth: 1, borderColor: "black" }}>
          Tyres collected:
        </Text>
        {tyres.map((item: { id: number; type: string; quantity: number }) => (
          <ListItem style={{ alignItems: "center", gap: 10 }} key={item.id} activeOpacity={1}>
            <View
              style={{
                borderColor: "black",
                borderWidth: 1,
                width: "100%",
                padding: 5,
                borderRadius: 5
              }}
            >
              <Text text80R>
                {item.type}: {item.quantity.toString()}
              </Text>
            </View>
          </ListItem>
        ))}
      </View>
      <SignatureScreen
        onBegin={() => setScrollEnabled(false)}
        onEnd={() => setScrollEnabled(true)}
        ref={ref}
        onOK={handleSubmit}
        autoClear={true}
        descriptionText={"Sign"}
        style={styles.signatureContainer}
        webviewContainerStyle={styles.signatureContainer}
        backgroundColor="transparent"
      />
      <LoadingModal isLoading={isLoading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signatureContainer: {
    backgroundColor: "transparent",
    minHeight: "100%"
  },
  container: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingBottom: 50,
    gap: 20
  },
  text: {
    width: "100%"
  }
});

export default Sign;
