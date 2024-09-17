import { Modal, View } from "react-native-ui-lib";
import React from "react";
import { ActivityIndicator } from "react-native";

const LoadingModal = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Modal
      overlayBackgroundColor={"rgba(0,0,0,0.5)"}
      enableModalBlur={true}
      transparent={true}
      animationType="slide"
      presentationStyle={"overFullScreen"}
      visible={isLoading}
    >
      <View
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: [{ translateX: -50 }, { translateY: -60 }],
          width: 100,
          height: 100,
          borderRadius: 10,
          backgroundColor: "#fff",
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 5.62,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size={"large"} color="#5848ff" />
      </View>
    </Modal>
  );
};

export default LoadingModal;
