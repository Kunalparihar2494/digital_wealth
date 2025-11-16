import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

export default function SafeAreaWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-2 ">{children}</View>
        </SafeAreaView>
    );
}
