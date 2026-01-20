// app/(tabs)/_layout.tsx

import BottomTabs from "@/src/components/shared/BottomTabs";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function TabsLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
            <BottomTabs />
        </View>
    );
}
