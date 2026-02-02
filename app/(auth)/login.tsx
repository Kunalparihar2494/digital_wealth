import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";

import AuthBottomText from "@/src/components/Auth/AuthBottomText";
import AuthBrandHeader from "@/src/components/Auth/AuthBrandHeader";
import AuthInput from "@/src/components/Auth/AuthInput";
import AuthScreenLayout from "@/src/components/Auth/AuthScreenLayout";
import SocialAuthButton from "@/src/components/Auth/SocialAuthButton";
import PrimaryButton from "@/src/components/PrimaryButton";

import LegalConsentText from "@/src/components/shared/LegalCOnsentText";
import { confirmBiometricLogin, loginUser, refreshAccessToken } from "@/src/services/auth";
import { authenticateBiometric } from "@/src/services/biometricAuth";
import { useAuthStore } from "@/src/store/auth.store";
import { getBiometricData, saveBiometricData } from "@/src/store/biometric.store";
import { useUserStore } from "@/src/store/user.store";
import { getDeviceId } from "@/src/utils/device";
import { Fingerprint } from "lucide-react-native";

export default function Login() {
    const [contact, setContact] = useState("");
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);

    const { setAuth } = useAuthStore();
    const { setUser } = useUserStore();

    /* =======================
       NORMAL LOGIN
    ======================= */
    const handleLogin = async () => {
        if (!contact || !pin) {
            Alert.alert("Error", "Enter mobile & PIN");
            return;
        }

        setLoading(true);
        try {
            const deviceId = await getDeviceId();
            const data = await loginUser({ contact, pin, deviceId });

            await AsyncStorage.setItem("accessToken", data.token);
            setAuth(data.token);
            setUser(data.user);

            await saveBiometricData({
                refreshToken: data.refreshtoken,
                username: data.user.username,
                deviceId,
            });

            if (data.isBioMatricEnabled === "NOT_ENABLED") {
                Alert.alert(
                    "Enable Biometric?",
                    "Use fingerprint for next login",
                    [
                        { text: "No" },
                        {
                            text: "Yes",
                            onPress: async () => {
                                const auth = await authenticateBiometric();
                                if (!auth.success) return;

                                await confirmBiometricLogin(data.refreshtoken, deviceId);

                                await saveBiometricData({
                                    refreshToken: data.refreshtoken,
                                    username: data.user.username,
                                    deviceId,
                                });

                                Alert.alert("Success", "Biometric enabled");
                            },
                        },
                    ]
                );
            }

            router.replace("/(tabs)/home");
        } catch {
            Alert.alert("Login failed");
        } finally {
            setLoading(false);
        }
    };

    /* =======================
       BIOMETRIC LOGIN
    ======================= */
    const handleBiometric = async () => {
        try {
            const auth = await authenticateBiometric();
            if (!auth.success) return;

            const bio = await getBiometricData();
            console.log('bio-', bio)
            if (!bio) {
                Alert.alert("Login required", "Use mobile & PIN once");
                return;
            }

            const data = await refreshAccessToken(
                bio.refreshToken,
                bio.deviceId,
                bio.Contact
            );

            await AsyncStorage.setItem("accessToken", data.token);
            setAuth(data.token);
            setUser(data.user);

            router.replace("/(tabs)/home");
        } catch {
            Alert.alert("Session expired", "Please login again");
            router.replace("/(auth)/login");
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
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

            <PrimaryButton title="Sign In" onPress={handleLogin} />

            <View className="flex-row justify-center mt-6">
                <SocialAuthButton
                    icon={<Fingerprint size={22} />}
                    label=""
                    onPress={handleBiometric}
                />
            </View>

            <AuthBottomText isSignin />
            <LegalConsentText />
        </AuthScreenLayout>
    );
}
