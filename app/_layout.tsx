import "react-native-gesture-handler";

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { POSProvider } from "../src/features/pos/context/POSContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <POSProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </POSProvider>
    </GestureHandlerRootView>
  );
}