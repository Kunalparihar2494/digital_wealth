import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ImageBackground,
    ScrollView,
} from "react-native";
import { Phone } from "lucide-react-native";
import { router } from "expo-router";
import InputField from "../../src/components/InputField";
import Button from "../../src/components/Button";

export default function Signup() {
    const [mobile, setMobile] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendOtp = async () => {
        if (!mobile || mobile.length !== 10) {
            Alert.alert("Error", "Please enter a valid 10-digit contact number");
            return;
        }

        setLoading(true);
        try {
            // 👉 Replace this with your real API call later
            await new Promise((r) => setTimeout(r, 1000));
            setOtpSent(true);
            Alert.alert("OTP Sent", "Check your phone for verification code");
        } catch (e) {
            Alert.alert("Error", "Unable to send OTP. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('@/assets/images/loggraphics3.png')}
            resizeMode="cover"
            className="flex-1"
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                className="bg-black/30"
            >
                <View className="flex-1 justify-center items-center px-6">
                    <View className="bg-white rounded-3xl shadow-lg w-full max-w-sm p-6">
                        <Text className="text-3xl font-bold text-center mb-8">
                            Create Account
                        </Text>

                        {/* Step Progress */}
                        <View className="flex-row justify-center items-center mb-6">
                            <View className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                <Text className="text-white font-bold">1</Text>
                            </View>
                            <View className="flex-1 h-[1px] bg-gray-300 mx-2" />
                            <View className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                <Text className="text-gray-600 font-bold">2</Text>
                            </View>
                            <View className="flex-1 h-[1px] bg-gray-300 mx-2" />
                            <View className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                <Text className="text-gray-600 font-bold">3</Text>
                            </View>
                        </View>

                        {/* Contact Number Input */}
                        <View className="flex-row items-center bg-blue-50 border border-blue-200 rounded-full px-3 mb-4">
                            <View className="mr-2">
                                <Phone color="#2563eb" />
                            </View>

                            <InputField
                                placeholder="Contact Number"
                                value={mobile}
                                onChangeText={setMobile}
                            />

                            <TouchableOpacity
                                onPress={sendOtp}
                                disabled={loading}
                                className="bg-blue-600 px-4 py-2 rounded-full"
                            >
                                <Text className="text-white font-semibold text-sm">
                                    {loading ? "Sending..." : "Send OTP"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row justify-center mt-6">
                            <Text className="text-gray-700">Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                                <Text className="text-blue-600 font-semibold">Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}
