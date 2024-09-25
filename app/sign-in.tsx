import React, { useState } from "react";
import { AppState, StyleSheet, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { Button, ButtonSize } from "react-native-ui-lib";
import signInWithEmail from "@/services/auth/signInWithEmail";
import signUpWithEmail from "@/services/auth/signUpWithEmail";
import { Input } from "@rneui/themed";
import { ToastError, ToastSuccess } from "@/lib/utils/Toasts";
import { router } from "expo-router";
import Routes from "@/constants/Routes";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const buttonDisabled = !email || !password || loading;

  async function signIn() {
    setLoading(true);
    const { error } = await signInWithEmail(email, password);

    if (error) {
      ToastError(error.message);
    } else {
      router.navigate(Routes.Home);
    }
    setLoading(false);
  }

  async function signUp() {
    setLoading(true);
    const { data, error } = await signUpWithEmail(email, password);

    if (error) ToastError(error.message);
    if (!data.session) ToastSuccess("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          onPress={signIn}
          label={"Sign in"}
          size={ButtonSize.large}
          style={styles.fullWidthButton}
          enableShadow
          borderRadius={5}
          disabled={buttonDisabled}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          onPress={signUp}
          label={"Sign up"}
          size={ButtonSize.large}
          style={styles.fullWidthButton}
          enableShadow
          borderRadius={5}
          disabled={buttonDisabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch"
  },
  mt20: {
    marginTop: 20
  },
  fullWidthButton: {
    width: "100%",
    height: 80
  }
});
