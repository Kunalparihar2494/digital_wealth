// src/components/PrimaryButton.tsx
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function PrimaryButton({ title, onPress, disabled }: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.85}
            className={`w-full py-3 rounded-lg mt-4 ${disabled ? "bg-gray-300" : "bg-blue-500"
                }`}
        >
            <Text className="text-white text-center font-semibold text-base">
                {title}
            </Text>
        </TouchableOpacity>
    );
}
