import {DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {Stack} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect} from "react";
import "react-native-reanimated";
import {FontAwesome} from "@expo/vector-icons";
import {useFonts} from "expo-font";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import AuthProvider from "@/components/AuthContext";
import Toast from "react-native-toast-message";

export {ErrorBoundary} from "expo-router";

// export const unstable_settings = {
//   Ensure that reloading on `/modal` keeps a back button present.
// initialRouteName: "homeOld"
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav/>;
}

function RootLayoutNav() {
    // const colorScheme = useColorScheme();
    return (
        <GestureHandlerRootView>
            <QueryClientProvider client={queryClient}>
                {/*<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>*/}
                <ThemeProvider value={DefaultTheme}>
                    <AuthProvider>
                        <Stack>
                            <Stack.Screen name="index" options={{headerShown: true, headerLargeTitle: false}}/>
                            <Stack.Screen name="modal" options={{presentation: "modal"}}/>
                            <Stack.Screen
                                name="pickUp"
                                options={{headerShown: true, headerBackTitle: "Cancel", headerTitle: "Pick Up"}}
                            />
                            <Stack.Screen name="fuel"
                                          options={{headerShown: true, headerBackTitle: "Back", title: "Fuel Log"}}/>
                            <Stack.Screen
                                name="dropOff"
                                options={{headerShown: true, headerBackTitle: "Back", title: "Drop Off"}}
                            />
                        </Stack>
                        <Toast topOffset={100}/>
                    </AuthProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
