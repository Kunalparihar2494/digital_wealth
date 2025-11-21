// src/components/EmptyMessage.tsx
import { View, Text } from "react-native";

export default function EmptyMessage({ message }: { message: string }) {
    return (
        <View className="py-10 items-center">
            <Text className="text-gray-500">{message}</Text>
        </View>
    );
}
