import AuthBottomText from "@/src/components/Auth/AuthBottomText";
import AuthBrandHeader from "@/src/components/Auth/AuthBrandHeader";
import AuthInput from "@/src/components/Auth/AuthInput";
import AuthScreenLayout from "@/src/components/Auth/AuthScreenLayout";
import SocialAuthButton from "@/src/components/Auth/SocialAuthButton";
import PrimaryButton from "@/src/components/PrimaryButton";
import { IUser } from "@/src/model/auth.interface";
import { loginUser, refreshAccessToken } from "@/src/services/auth";
import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
import { biometricLogin } from "@/src/utils/biometric";
import { getDeviceId } from "@/src/utils/device";
import { REMEMBER_CONTACT_KEY, REMEMBER_KEY } from '@/src/utils/index';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Fingerprint } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";



export default function Login() {
    const [contact, setContact] = useState("");
    const [pin, setPin] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false);
    const { setAuth } = useAuthStore();
    const { setUser } = useUserStore();

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const token = await biometricLogin();
    //             if (token) {
    //                 await setAuth(token);
    //                 router.replace("/(tabs)/home");
    //             }
    //         } catch {
    //             // silently ignore (expected after logout)
    //         }
    //     })();
    // }, []);


    useEffect(() => {
        const loadRememberedUser = async () => {
            const remember = await AsyncStorage.getItem(REMEMBER_KEY);
            const savedContact = await AsyncStorage.getItem(REMEMBER_CONTACT_KEY);

            if (remember === "true" && savedContact) {
                setContact(savedContact);
                setRemember(true);
            }
        };

        loadRememberedUser();
    }, []);

    const handleLogin = async () => {
        if (!contact || !pin) {
            Alert.alert("Error", "Please enter mobile number and password");
            return;
        }

        setLoading(true);
        try {
            const deviceId = await getDeviceId();
            const data: IUser = await loginUser({ contact, pin, deviceId });

            if (!data?.token || !data?.refreshtoken) {
                Alert.alert("Login Failed");
                return;
            }

            // Normal login
            await AsyncStorage.setItem("accessToken", data.token);
            await setAuth(data.token);
            await setUser(data.user);

            // Ask biometric ONLY ONCE
            // const canUseBiometric = await isBiometricAvailable();
            // if (canUseBiometric) {
            //     Alert.alert(
            //         "Enable Biometric Login?",
            //         "Use fingerprint for future logins",
            //         [
            //             { text: "No" },
            //             {
            //                 text: "Yes",
            //                 onPress: async () => {
            //                     const enabled = await enableBiometric(data.refreshtoken);

            //                     if (enabled) {
            //                         await confirmBiometricLogin(data.refreshtoken, deviceId);
            //                     }
            //                 },
            //             },
            //         ]
            //     );
            // }

            router.replace("/(tabs)/home");
        } catch (e) {
            Alert.alert("Error", "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleBiometric = async () => {
        try {
            const refreshToken = await biometricLogin();
            console.log('refreshtoken-', refreshToken)
            if (!refreshToken) {
                Alert.alert(
                    "Biometric Login Not Available",
                    "Login once using PIN to enable biometric login."
                );
                return;
            }

            const deviceId = await getDeviceId();
            const res = await refreshAccessToken(refreshToken, deviceId);
            console.log('res device id -', refreshToken)
            if (!res?.accessToken) {
                throw new Error("Invalid refresh response");
            }

            await AsyncStorage.setItem("accessToken", res.accessToken);
            await setAuth(res.accessToken);
            await setUser(res.user);

            router.replace("/(tabs)/home");
        } catch {
            Alert.alert("Session expired", "Please login again");
            router.replace("/(auth)/login");
        }
    }


    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
                {/* You can add color by: <ActivityIndicator size="large" color="#000" /> */}
            </View>
        );
    }

    return (
        <AuthScreenLayout>
            <AuthBrandHeader />

            {/* Title */}
            <Text className="text-2xl font-semibold text-gray-600 text-center mb-8">
                Login to your Account
            </Text>

            {/* Inputs */}
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

            {/* Sign In */}
            <View className="mt-4 w-full">
                <PrimaryButton title="Sign In" onPress={handleLogin} />
            </View>

            {/* Divider */}
            <View className="flex-row items-center my-6">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="mx-3 text-gray-400 text-sm">Or sign in with</Text>
                <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Social Login */}
            <View className="flex-row justify-center gap-6 mb-6">
                <SocialAuthButton
                    icon={<Fingerprint size={20} color="#374151" />}
                    label=""
                    onPress={() => {
                        console.log("🔥 BIOMETRIC BUTTON PRESSED");
                    }}
                />

            </View>

            {/* Bottom Text */}
            <AuthBottomText isSignin={true} />
        </AuthScreenLayout>
    );
}


