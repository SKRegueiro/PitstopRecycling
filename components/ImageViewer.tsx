import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Button } from "react-native-ui-lib";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  path?: string;
  onRemove: () => void;
};

const ImageViewer = ({ path, onRemove }: Props) => {
  return (
    <View style={styles.container}>
      {path && (
        <>
          <Button
            round={true}
            iconSource={() => <AntDesign onPress={onRemove} name="close" size={24} color="white" />}
            size={"small"}
            style={styles.closeButton}
          />
          <Image style={styles.image} source={{ uri: path }} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "90%",
    height: "33%"
  },
  closeButton: {
    backgroundColor: "#ff2442",
    position: "absolute",
    width: 34,
    height: 34,
    top: -10,
    right: -10,
    zIndex: 1
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default ImageViewer;
