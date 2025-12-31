import React from "react";
import { View } from "react-native";

export default function ProfileCard({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <View className="bg-white w-full rounded-2xl p-6 shadow-md">
            {children}
        </View>
    );
}
