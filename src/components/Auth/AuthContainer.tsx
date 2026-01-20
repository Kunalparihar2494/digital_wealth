// src/components/AuthLayout.tsx
import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View
} from "react-native";

interface AuthLayoutProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function AuthLayout({
    title,
    subtitle,
    children,
}: AuthLayoutProps) {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
                <View className="flex-1 items-center justify-center bg-gray-600 px-5">
                    {/* Card */}
                    <View className="bg-gray-600 flex-row w-full max-w-sm rounded-3xl px-6 py-8 shadow-lg">

                        {/* Logo */}
                        {/* <View className="items-center mb-6"> */}
                        {/* 🔹 Gradient Icon Circle */}
                        {/* <BrandHeader />

                        </View> */}

                        {/* Title */}
                        {/* {title && (<Text className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            {title}
                        </Text>)
                        } */}


                        {/* Slot */}
                        <View className="mt-4">
                            {children}
                        </View>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
