import { Image, View } from "react-native";
import React from "react";
import { Button } from "react-native-ui-lib";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  path?: string;
  onRemove: () => void;
};

const ImageViewer = ({ path, onRemove }: Props) => {
  return (
    <View style={{ position: "relative", width: "90%", height: "33%" }}>
      {path && (
        <>
          <Button
            round={true}
            iconSource={() => <AntDesign onPress={onRemove} name="close" size={24} color="white" />}
            size={"small"}
            style={{
              backgroundColor: "#ff2442",
              position: "absolute",
              width: 34,
              height: 34,
              top: -10,
              right: -10,
              zIndex: 1
            }}
          />
          <Image style={{ width: "100%", height: "100%" }} source={{ uri: path }} />
        </>
      )}
    </View>
  );
};

export default ImageViewer;
