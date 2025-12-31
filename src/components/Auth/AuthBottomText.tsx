// src/components/auth/AuthBottomText.tsx
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function AuthBottomText() {
    return (
        <View className="flex-row justify-center mt-6">
            <Text className="text-sm text-gray-600">
                Don’t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
                <Text className="text-sm text-emerald-600 font-semibold">
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    );
}
