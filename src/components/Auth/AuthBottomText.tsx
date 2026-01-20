// src/components/auth/AuthBottomText.tsx
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function AuthBottomText({ isSignin }: any) {
    return (
        <View className="flex-row justify-center mt-6">

            {
                isSignin ?
                    <>
                        <Text className="text-sm text-gray-600">
                            Don’t have an account?{" "}
                        </Text>
                        <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
                            <Text className="text-sm text-emerald-600 font-semibold">
                                Sign Up
                            </Text>
                        </TouchableOpacity></> :
                    <>
                        <Text className="text-sm text-gray-600">
                            Do you have an account?{" "}
                        </Text>
                        <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                            <Text className="text-sm text-emerald-600 font-semibold">
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </>
            }

        </View>
    );
}
