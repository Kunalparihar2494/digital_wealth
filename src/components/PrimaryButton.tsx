// src/components/PrimaryButton.tsx
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function PrimaryButton({ title, onPress, disabled }: any) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.85}>
            <LinearGradient
                colors={disabled ? ["#9CA3AF", "#9CA3AF"] : ["#16A34A", "#22C55E"]}
                className="py-3 rounded-xl mt-3"
                style={{ borderRadius: 10 }}
            >
                <Text className="text-white text-center text-lg font-semibold">
                    {title}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}
