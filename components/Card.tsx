import React from "react";
import { View } from "react-native";

type CardProps = {
  children: React.ReactNode;
};
const Card = ({ children }: CardProps) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        height: "30%",
        width: "100%",
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowOpacity: 0.2,
        shadowRadius: 5.62,
        elevation: 7
      }}
    >
      {children}
    </View>
  );
};

export default Card;
