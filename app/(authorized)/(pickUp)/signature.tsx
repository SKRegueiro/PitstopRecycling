import React, { useRef, useState } from "react";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";
import { ScrollView, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { ListItem, Text } from "react-native-ui-lib";
import LoadingModal from "@/components/LoadingModal";
import { usePickUpContext } from "@/app/(authorized)/(pickUp)/_layout";

const Signature = () => {
  const ref = useRef<SignatureViewRef>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { client, tyres, loading, onSubmit } = usePickUpContext();

  const handleSubmit = (signature: string) => onSubmit(signature);

  return (
    <ScrollView contentInset={{ bottom: 100 }} scrollEnabled={scrollEnabled} contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Signature",
          headerTitleAlign: "center",
          headerTitle: () => <Text style={styles.headerTitle}>Signature</Text>,
          headerRight: () => null
        }}
      />
      <View style={styles.textContainer}>
        <Text text40R>Client:</Text>
        <Text text80R>{client?.business_name}</Text>
      </View>
      <View>
        <Text text40R style={styles.textContainer}>
          Tyres collected:
        </Text>
        {tyres.map((item: { id: number; type: string; quantity: number }) => (
          <ListItem style={styles.listItem} key={item.id} activeOpacity={1}>
            <View style={styles.listItemContent}>
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
      <LoadingModal isLoading={loading} />
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
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20
  },
  textContainer: {
    width: "100%"
  },
  listItem: {
    alignItems: "center",
    gap: 10
  },
  listItemContent: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    padding: 5,
    borderRadius: 5
  }
});

export default Signature;
