// src/components/PrimaryButton.tsx
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { PrimaryButtonProps } from "@/src/types/components";

export default function PrimaryButton({
    title,
    onPress,
    disabled = false,
    loading = false,
    variant = "primary",
}: PrimaryButtonProps) {
    const bgColor =
        variant === "primary"
            ? "bg-blue-500"
            : variant === "danger"
                ? "bg-red-500"
                : "bg-gray-500";

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.85}
            className={`w-full py-3 rounded-lg mt-4 ${disabled ? "bg-gray-300" : bgColor
                }`}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text className="text-white text-center font-semibold text-base">
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}
