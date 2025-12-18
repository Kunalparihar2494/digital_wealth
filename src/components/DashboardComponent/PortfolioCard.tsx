// src/components/PortfolioCard.tsx
import { Text, View } from "react-native";

export default function PortfolioCard({
    title,
    amount,
}: {
    title: string;
    amount: string;
}) {
    return (
        <View className="bg-white rounded-2xl p-4 w-40 mr-4 shadow-sm">
            <View className="w-8 h-8 rounded-lg bg-emerald-100 mb-3" />
            <Text className="text-gray-700 font-medium">{title}</Text>
            <Text className="text-gray-900 font-semibold mt-1">{amount}</Text>
        </View>
    );
}
