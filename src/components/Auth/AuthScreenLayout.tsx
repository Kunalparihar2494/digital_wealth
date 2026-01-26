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
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: insets.top + 40,
                    paddingBottom: 40,
                    flexGrow: 1,
                    justifyContent: "center",   // 🔥 REQUIRED
                }}
                className="bg-white"
            >
                <View className="px-6">{children}</View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
