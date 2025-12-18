// src/components/StepIndicator.tsx
import React from "react";
import { Text, View } from "react-native";

interface StepIndicatorProps {
    step: number;
    totalSteps?: number;
}

export default function StepIndicator({
    step,
    totalSteps = 3,
}: StepIndicatorProps) {
    return (
        <View className="flex-row items-center justify-center mb-8">
            {Array.from({ length: totalSteps }).map((_, index) => {
                const currentStep = index + 1;
                const isCompleted = step > currentStep;
                const isActive = step === currentStep;

                return (
                    <View key={currentStep} className="flex-row items-center">
                        {/* Step Circle */}
                        <View
                            className={`w-10 h-10 rounded-full items-center justify-center
                ${isCompleted
                                    ? "bg-emerald-500"
                                    : isActive
                                        ? "bg-blue-700"
                                        : "bg-gray-300"
                                }
              `}
                        >
                            <Text
                                className={`font-bold ${isCompleted || isActive
                                    ? "text-white"
                                    : "text-gray-600"
                                    }`}
                            >
                                {currentStep}
                            </Text>
                        </View>

                        {/* Connector Line */}
                        {currentStep < totalSteps && (
                            <View
                                className={`w-12 h-[2px] mx-2 ${step > currentStep
                                    ? "bg-emerald-500"
                                    : "bg-gray-300"
                                    }`}
                            />
                        )}
                    </View>
                );
            })}
        </View>
    );
}
