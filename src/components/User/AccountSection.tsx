import { ReactNode } from "react";
import { Text, View } from "react-native";

export function AccountSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <View className="mb-6">
            <Text className="text-xs text-gray-500 mb-2 uppercase px-1">
                {title}
            </Text>
            <View className="bg-white rounded-xl shadow-sm">
                {children}
            </View>
        </View>
    );
}
