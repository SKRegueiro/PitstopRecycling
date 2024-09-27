import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import AuthProvider from "@/components/AuthContext";
import Toast from "react-native-toast-message";
import { Slot } from "expo-router";

const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Slot />
          <Toast topOffset={100} />
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
