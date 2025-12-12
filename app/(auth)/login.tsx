import { IUser } from "@/src/model/auth.interface";
import { loginUser } from "@/src/services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
    const [contact, setContact] = useState("");
    const [pin, setPin] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!contact || !pin) {
            Alert.alert("Error", "Please enter mobile number and password");
            return;
        }
        setLoading(true);
        try {
            const data: IUser = await loginUser({ contact, pin });

            if (data?.success || data?.token) {
                await AsyncStorage.setItem("userData", JSON.stringify(data.user));
                await AsyncStorage.setItem("token", data.token);
                router.replace("/(tabs)/home");
            } else {
                Alert.alert("Login Failed", data?.message || "Invalid credentials");
            }
        } catch (err: any) {
            console.log(err);
            Alert.alert("Error", "Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
                {/* You can add color by: <ActivityIndicator size="large" color="#000" /> */}
            </View>
        );
    }

    const handleEye = () => {
        setShowPassword(!showPassword);
    }

    return (

        <View className="flex-1 justify-center items-center bg-primary px-5">
            {/* Logo */}
            <Image
                source={require('@/assets/images/loggraphics3.png')}
                className="w-100 h-20 mb-4"
                resizeMode="contain"
            />
            <View className='mb-10'>
                <Text className='text-5xl text-white '>Digital Wealth</Text>
            </View>

            {/* Card */}
            <View className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-md mt-2">
                <Text className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Sign In
                </Text>

                {/* Contact Number */}
                <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-gray-50">
                    <Text className="text-gray-400 mr-2">📞</Text>
                    <TextInput
                        placeholder="Contact Number"
                        value={contact}
                        onChangeText={setContact}
                        keyboardType="phone-pad"
                        className="flex-1 text-gray-700"
                        placeholderTextColor="#999"
                        maxLength={10}
                    />
                </View>

                {/* PIN */}
                <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 mb-6 bg-gray-50">
                    <Text className="text-gray-400 mr-2">🔒</Text>
                    <TextInput
                        placeholder="6-Digit PIN"
                        value={pin}
                        onChangeText={setPin}
                        secureTextEntry={showPassword}
                        keyboardType="numeric"
                        className="flex-1 text-gray-700"
                        placeholderTextColor="#999"
                        maxLength={6}
                    />
                    <Text onPress={handleEye} className="text-gray-400 ml-2">👁️</Text>
                </View>

                {/* Login Button */}
                <TouchableOpacity onPress={handleLogin} className="bg-secondary py-3 rounded-full">
                    <Text className="text-white text-center text-lg font-medium">
                        Login
                    </Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity>
                    <Text className="text-primary text-center mt-3 text-sm">
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

                {/* Create Account */}
                <View className="flex-row justify-center mt-4">
                    <Text className="text-gray-600">Don’t have an account? </Text>
                    <TouchableOpacity
                        // onPress={() => Linking.openURL("https://digitalwealth.in/Auth/Home")}
                        onPress={() => router.replace("/(auth)/signup")}
                    >
                        <Text className="text-primary font-medium">Create One</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
