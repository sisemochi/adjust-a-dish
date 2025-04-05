import { Stack } from 'expo-router';

export default function StackLayout() {
  return <Stack screenOptions={{}}>
    <Stack.Screen name="addItem" options={{ headerShown: false, headerTitle:"Add an item"}} initialParams={{
      orderId: ""
    }}/>
    <Stack.Screen name="seeOrder" options={{ headerShown: false, headerTitle:"Order details"}}/>
  </Stack>;
}
