import { Stack } from 'expo-router';

export default function StackLayout() {
  return <Stack screenOptions={{}}>
    <Stack.Screen name="index" options={{ headerShown: true, headerTitle:"Order list" }} />
    <Stack.Screen name="[orderId]" options={{ headerShown: true, headerTitle:"Order details"}}/>
  </Stack>;
}
