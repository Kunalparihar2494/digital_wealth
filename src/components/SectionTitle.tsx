// src/components/SectionTitle.tsx
import { Text, View } from "react-native";

export default function SectionTitle({ title }: { title: string }) {
    return (
        <View className="px-4 mt-6 mb-2">
            <Text className="text-gray-900 font-semibold text-base">
                {title}
            </Text>
        </View>
    );
}
