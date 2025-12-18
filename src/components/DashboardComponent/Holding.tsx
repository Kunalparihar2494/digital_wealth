// src/components/Dashboard/HoldingItem.tsx
import { Text, View } from "react-native";

type Props = {
    name: string;
    qty: number;
    price: string;
    pnl: string;
    percent: string;
    isLoss?: boolean;
};

export default function HoldingItem({
    name,
    qty,
    price,
    pnl,
    percent,
    isLoss,
}: Props) {
    return (
        <View className="bg-white rounded-xl p-4 mb-3 flex-row justify-between shadow-sm">
            <View>
                <Text className="font-semibold text-gray-900">{name}</Text>
                <Text className="text-gray-500 text-xs">
                    Qty: {qty} · Price: {price}
                </Text>
            </View>

            <View className="items-end">
                <Text
                    className={`font-semibold ${isLoss ? "text-red-500" : "text-emerald-600"
                        }`}
                >
                    {pnl}
                </Text>
                <Text
                    className={`text-xs ${isLoss ? "text-red-500" : "text-emerald-600"
                        }`}
                >
                    {percent}
                </Text>
            </View>
        </View>
    );
}
