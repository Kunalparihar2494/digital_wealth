import {
    CheckCircle2,
    ChevronRight,
    CircleX,
} from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
    label: string;
    icon?: React.ReactNode;
    onPress?: () => void;
    verified?: boolean;
};

export function AccountItem({
    label,
    icon,
    onPress,
    verified,
}: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.75}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100 bg-white"
        >
            <View className="flex-row items-center flex-1">
                {icon && <View className="mr-3">{icon}</View>}

                <Text className="text-gray-800 text-[15px] font-medium">
                    {label}
                </Text>
            </View>

            <View className="flex-row items-center">
                {verified !== undefined && (
                    <View className="mr-2">
                        {verified ? (
                            <CheckCircle2
                                size={20}
                                color="#16A34A"
                            />
                        ) : (
                            <CircleX
                                size={20}
                                color="#DC2626"
                            />
                        )}
                    </View>
                )}

                <ChevronRight
                    size={18}
                    color="#9CA3AF"
                />
            </View>
        </TouchableOpacity>
    );
}