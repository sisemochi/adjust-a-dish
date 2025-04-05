import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/components/useColorScheme';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from "react-native-paper";
import {defaultDarkTheme, defaultLightTheme} from "@/constants/Colors";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    const colorScheme = useColorScheme();

    const paperTheme = colorScheme === "light" ? {
        ...MD3LightTheme,
        colors: defaultLightTheme.colors
    } : {...MD3DarkTheme, colors: defaultDarkTheme.colors}


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

    return (
        <PaperProvider theme={paperTheme}>
            <RootLayoutNav/>
        </PaperProvider>
    );
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="login" options={{headerBackTitle: "Back", title: "Login"}}/>
                <Stack.Screen name="register" options={{headerBackTitle: "Back", title: "Sign up"}}/>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="modal" options={{presentation: 'modal'}}/>
                <Stack.Screen name="kitchen" options={{headerShown: false}}/>
                <Stack.Screen name="server" options={{headerShown: false}}/>
            </Stack>
        </ThemeProvider>
    );
}
