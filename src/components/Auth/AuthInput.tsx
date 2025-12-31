// src/components/AuthInput.tsx
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface AuthInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;

    icon?: React.ReactNode;
    keyboardType?: "default" | "numeric" | "phone-pad" | "email-address";
    secureTextEntry?: boolean;
    maxLength?: number;

    // OTP related
    showOtpButton?: boolean;
    otpSent?: boolean;
    onSendOtp?: () => void;
    timer?: number;
}

export default function AuthInput({
    placeholder,
    value,
    onChangeText,
    icon,
    maxLength,
    keyboardType = "default",
    secureTextEntry = false,
    showOtpButton = false,
    otpSent = false,
    onSendOtp,
    timer,
}: AuthInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="flex-row items-center bg-gray-50 border border-gray-300 rounded-xl px-4 py-1 mb-4">
            {/* Left Icon */}
            {icon && <View className="mr-3">{icon}</View>}

            {/* Input */}
            <TextInput
                className="flex-1 text-gray-800 text-base"
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry && !showPassword}
                maxLength={maxLength}
            />

            {/* Eye icon for password */}
            {secureTextEntry && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                        <EyeOff size={18} color="#6B7280" />
                    ) : (
                        <Eye size={18} color="#6B7280" />
                    )}
                </TouchableOpacity>
            )}

            {/* OTP Button */}
            {showOtpButton && (
                <TouchableOpacity
                    onPress={onSendOtp}
                    disabled={otpSent}
                    className={`ml-3 px-3 py-1 rounded-full ${otpSent ? "bg-gray-300" : "bg-emerald-500"
                        }`}
                >
                    <Text className="text-white text-xs font-semibold">
                        {otpSent && timer && timer > 0
                            ? `Resend in ${timer}s`
                            : "Send OTP"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
