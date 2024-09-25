import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function TabTwoScreen() {
  const [mapRegion, setmapRegion] = useState({
    latitude: -37.8136,
    longitude: 144.9631,
    latitudeDelta: 0.1922,
    longitudeDelta: 0.0421
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  map: {
    width: "100%",
    height: "100%"
  }
});
