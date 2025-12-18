// src/components/Dashboard/TrendingStockCard.tsx
import { Text, View } from "react-native";

type Props = {
    name: string;
    percent: string;
    isLoss?: boolean;
};

export default function TrendingStockCard({
    name,
    percent,
    isLoss,
}: Props) {
    return (
        <View className="flex-1 bg-white rounded-xl p-4 shadow-sm mr-3">
            <Text className="font-semibold text-gray-900">{name}</Text>
            <Text
                className={`text-sm mt-1 ${isLoss ? "text-red-500" : "text-emerald-600"
                    }`}
            >
                {percent}
            </Text>
        </View>
    );
}
