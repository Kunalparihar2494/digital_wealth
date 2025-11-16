import { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

interface InputProps {
    placeholder: string;
    icon?: React.ReactNode;
    secureTextEntry?: boolean;
    value: string;
    onChangeText: (text: string) => void;
}

export default function InputField({
    placeholder,
    icon,
    secureTextEntry,
    value,
    onChangeText,
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
            />

            {isPassword && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff color="#6B7280" /> : <Eye color="#6B7280" />}
                </TouchableOpacity>
            )}
        </View>
    );
}
