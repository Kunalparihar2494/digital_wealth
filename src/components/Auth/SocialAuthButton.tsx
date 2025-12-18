import React from "react";
import { TouchableOpacity } from "react-native";

type SocialAuthButtonProps = {
    label: string;
    icon: React.ReactNode;
    onPress?: () => void;
};

export default function SocialAuthButton({
    label,
    icon,
    onPress,
}: SocialAuthButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className="items-center justify-center border border-gray-300 bg-white"
            style={{
                width: 48,
                height: 48,
                borderRadius: 24, // half of width/height → perfect circle
            }}
        >
            {icon}
        </TouchableOpacity>
    );
}
