import React from "react";
import { Keyboard, Platform } from "react-native";

const useMoveOnKeyboardOpen = () => {
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

  return { bottom };
};

export default useMoveOnKeyboardOpen;
