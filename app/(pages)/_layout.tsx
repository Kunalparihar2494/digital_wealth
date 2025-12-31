// app/(tabs)/_layout.tsx

import { Stack } from "expo-router";
import { View } from "react-native";

export default function PagesLayout() {
    return (
        <View style={{ flex: 1 }}>
            {/* Screens inside (tabs) */}
            <Stack screenOptions={{ headerShown: false }} />
        </View>
    );
}
