// src/components/StepIndicator.tsx
import { View, Text } from "react-native";
import React from "react";

export default function StepIndicator({ step }: { step: number }) {
    return (
        <View className="flex-row justify-center items-center mb-6">
            {[1, 2, 3].map((num, index) => (
                <View key={num} className="flex-row items-center flex-1">
                    <View
                        className={`w-10 h-10 rounded-full items-center justify-center ml-6 ${step === num
                            ? "bg-blue-600"
                            : step > num
                                ? "bg-green-600"
                                : "bg-gray-300"
                            }`}
                    >
                        <Text
                            className={`font-bold ${step >= num ? "text-white" : "text-gray-600"
                                }`}
                        >
                            {num}
                        </Text>
                    </View>

                    {index < 2 && (
                        <View className="flex-1 h-[2px] bg-gray-300 mx-2" />
                    )}
                </View>
            ))}
        </View>
    );
}
