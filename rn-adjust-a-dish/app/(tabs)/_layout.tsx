import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Tabs} from 'expo-router';
import {useColorScheme} from '@/components/useColorScheme';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useTheme} from "react-native-paper";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {
    const theme = useTheme()

    return (
        <Tabs
            screenOptions={{
                headerShown: useClientOnlyValue(false, true),
                headerTintColor: theme.colors.primary,
                tabBarActiveTintColor: theme.colors.primary
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({color}) => <Ionicons name={"person-circle-outline"} color={color} size={24}/>,
                }}
            />
            <Tabs.Screen
                name="health"
                options={{
                    title: 'Health',
                    tabBarIcon: ({color}) => <Ionicons name={"heart-circle"} color={color} size={24}/>,
                }}
            />
            <Tabs.Screen
                name="qr"
                options={{
                    title: 'QR',
                    tabBarIcon: ({color}) => <Ionicons name={"qr-code"} color={color} size={24}/>,
                }}
            />
        </Tabs>
    );
}
