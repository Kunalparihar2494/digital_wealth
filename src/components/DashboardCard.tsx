// src/components/DashboardCard.tsx
import { View, Text } from "react-native";
import React from "react";

type DashboardCardProps = {
    title: string;
    children?: React.ReactNode;
};

export default function DashboardCard({ title, children }: DashboardCardProps) {
    return (
        <View className="bg-white p-4 rounded-xl shadow mb-4">
            <Text className="text-lg font-semibold mb-3">{title}</Text>
            {children}
        </View>
    );
}
