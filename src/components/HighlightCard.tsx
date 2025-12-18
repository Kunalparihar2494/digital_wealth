// src/components/HighlightCard.tsx
import { Text, View } from "react-native";

export default function HighlightCard() {
    return (
        <View className="bg-white mx-4 mt-4 rounded-2xl p-4 shadow-sm flex-row justify-between">
            <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-gray-200 mr-3 items-center justify-center">
                    <Text className="font-bold">P</Text>
                </View>
                <View>
                    <Text className="font-semibold">Paytm</Text>
                    <Text className="text-xs text-gray-500">
                        Qty: 15 · Price: ₹850.0
                    </Text>
                </View>
            </View>

            <View className="items-end">
                <Text className="text-emerald-600 font-semibold">+₹2450</Text>
                <Text className="text-xs text-emerald-600">+3.1%</Text>
            </View>
        </View>
    );
}
