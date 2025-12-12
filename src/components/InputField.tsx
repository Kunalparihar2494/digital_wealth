import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface InputProps {
    placeholder: string;
    icon?: React.ReactNode;
    secureTextEntry?: boolean;
    value: string;
    onChangeText: (text: string) => void;
    numeric?: boolean;                // keyboard numeric
    showOtpButton?: boolean;          // enable "Send OTP"
    otpSent?: boolean;                // state from parent
    onSendOtp?: () => void;
    timer?: number;
}

export default function InputField({
    placeholder,
    icon,
    secureTextEntry = false,
    value,
    onChangeText,
    numeric = false,
    showOtpButton = false,
    otpSent = false,
    onSendOtp,
    timer

}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = secureTextEntry;

    return (
        <View className="flex-row items-center bg-blue-50 border border-blue-200 rounded-full px-4 mb-4">
            {icon && <View className="mr-2">{icon}</View>}

            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isPassword && !showPassword}
                className="flex-1 py-3 text-base text-gray-700"
                placeholderTextColor="#6B7280"
                keyboardType={numeric ? "numeric" : "default"}
            />

            {isPassword && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff color="#6B7280" /> : <Eye color="#6B7280" />}
                </TouchableOpacity>
            )}

            {/* 🔥 OTP Button */}
            {showOtpButton && (
                <TouchableOpacity
                    onPress={onSendOtp}
                    disabled={otpSent}
                    className={`ml-3 px-3 py-1 rounded-full ${otpSent ? "bg-gray-300" : "bg-blue-600"
                        }`}
                >
                    <Text className="text-white text-sm font-semibold">
                        {otpSent
                            ? timer && timer > 0
                                ? `Resend OTP in ${timer}s`
                                : "Send OTP"
                            : "Send OTP"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
