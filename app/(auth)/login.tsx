import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, InteractionManager, Text, View } from "react-native";

import AuthBottomText from "@/src/components/Auth/AuthBottomText";
import AuthBrandHeader from "@/src/components/Auth/AuthBrandHeader";
import AuthInput from "@/src/components/Auth/AuthInput";
import AuthScreenLayout from "@/src/components/Auth/AuthScreenLayout";
import SocialAuthButton from "@/src/components/Auth/SocialAuthButton";
import PrimaryButton from "@/src/components/PrimaryButton";

import LegalConsentText from "@/src/components/shared/LegalCOnsentText";
import { confirmBiometricLogin, loginUser } from "@/src/services/auth";
import { authenticateBiometric } from "@/src/services/biometricAuth";
import { useAuthStore } from "@/src/store/auth.store";
import { saveBiometricData } from "@/src/store/biometric.store";
import { useUserStore } from "@/src/store/user.store";
import { getDeviceId } from "@/src/utils/device";
import { Fingerprint } from "lucide-react-native";


export default function Login() {
    const [contact, setContact] = useState("");
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);
    const navigateToHome = () => {
        InteractionManager.runAfterInteractions(() => {
            router.replace("/(tabs)/home");
        });
    };

    const { setAuth } = useAuthStore();
    const { setUser } = useUserStore();

    const handleLogin = async () => {
        if (!contact || !pin) {
            Alert.alert("Error", "Enter mobile & PIN");
            return;
        }

        const netState = await NetInfo.fetch();
        if (!netState.isConnected) {
            Alert.alert(
                "No Connection",
                "Please check your internet connection and try again."
            );
            return;
        }

        setLoading(true);
        try {
            const deviceId = await getDeviceId();
            const data = await loginUser({ contact, pin, deviceId });

            if (!data?.token) {
                throw new Error(data?.message || "Login failed: missing auth token.");
            }

            // 🔥 FIX FOR OLD PHONES: Update state BEFORE navigation
            await AsyncStorage.setItem("accessToken", data.token);
            setAuth(data.token);
            setUser(data.user);

            await saveBiometricData({
                refreshToken: data.refreshtoken,
                username: data.user.username,
                deviceId,
            });

            // Biometric Check
            if (data.isBioMatricEnabled === "NOT_ENABLED") {
                Alert.alert(
                    "Enable Biometric?",
                    "Use fingerprint for next login",
                    [
                        {
                            text: "No",
                            onPress: () => {
                                // Delay added to ensure state is committed
                                // setTimeout(() => router.replace("/(tabs)/home"), 300);
                                navigateToHome();
                            }
                        },
                        {
                            text: "Yes",
                            onPress: async () => {
                                const auth = await authenticateBiometric();
                                if (auth.success) {
                                    await confirmBiometricLogin(data.refreshtoken, deviceId);
                                }
                                // setTimeout(() => router.replace("/(tabs)/home"), 300);
                                navigateToHome();
                            },
                        },
                    ]
                );
            } else {
                // If biometric already enabled, direct jump with delay
                // setTimeout(() => router.replace("/(tabs)/home"), 300);
                navigateToHome();
            }

        } catch (error: any) {
            // console.log("Login API error:", error);
            let msg = error?.response?.data?.message || error?.message || "Invalid Credentials";
            Alert.alert("Login Info", msg);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#10b981" />
                <Text className="mt-4 text-gray-500">Signing in...</Text>
            </View>
        );
    }

    return (
        <AuthScreenLayout>
            <AuthBrandHeader />
            <Text className="text-2xl font-semibold text-gray-700 text-center mb-8">
                Sign in to your Account
            </Text>
            <AuthInput
                placeholder="Mobile No."
                keyboardType="phone-pad"
                value={contact}
                onChangeText={setContact}
                maxLength={10}
            />

            <AuthInput
                placeholder="Password"
                secureTextEntry
                keyboardType="numeric"
                value={pin}
                onChangeText={setPin}
                maxLength={6}
            />

            <Text
                className="text-right text-blue-600 mt-2 mb-4"
                onPress={() => router.push("/(auth)/forgotPassword")}
            >
                Forgot Password?
            </Text>

            <PrimaryButton title="Sign In" onPress={handleLogin} />

            <View className="flex-row justify-center mt-6">
                <SocialAuthButton
                    icon={<Fingerprint size={22} color="#10b981" />}
                    label=""
                    onPress={() => Alert.alert("Biometric", "Please login with PIN first to enable this.")}
                />
            </View>

            <AuthBottomText isSignin />
            <LegalConsentText />
        </AuthScreenLayout>
    );
}