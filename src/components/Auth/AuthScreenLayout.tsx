import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AuthScreenLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const insets = useSafeAreaInsets();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            className="bg-gray-100"
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                contentContainerClassName="bg-gray-100 mt-4 pt-4"
            >
                <View className="px-4 items-center ">
                    {children}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
