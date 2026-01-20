import { IHoldingShares } from "@/src/model/shares.interface";
import React from "react";
import { Text, View } from "react-native";

type Props = {
    data?: IHoldingShares[];
    visibleCount?: number;
};

export default function HoldingsList({
    data,
    visibleCount = 2,
}: Props) {
    // 🔹 Empty state
    if (!data || data.length === 0) {
        return (
            <View className="bg-gray-200 mx-4 p-6 rounded-xl items-center">
                <Text className="text-gray-500">
                    No holdings available
                </Text>
            </View>
        );
    }

    return (
        <View className="mx-4">
            {data.slice(0, visibleCount).map((item, index) => {
                const isLoss = item.profitLoss;

                return (
                    <View
                        key={index}
                        className="bg-gray-200 rounded-xl p-4 mb-3 flex-row justify-between items-center"
                    >
                        {/* LEFT */}
                        <View>
                            <Text className="font-semibold text-gray-900">
                                {item.shareName}
                            </Text>
                            <Text className="text-xs text-gray-500">
                                Qty: {item.totalQuantity} · Price: {item.currentPrice}
                            </Text>
                        </View>

                        {/* RIGHT */}
                        <View className="items-end">
                            <Text
                                className={`font-semibold ${isLoss < 0 ? "text-red-500" : "text-emerald-600"
                                    }`}
                            >
                                {item.profitLoss}
                            </Text>
                            <Text
                                className={`text-xs ${isLoss < 0 ? "text-red-500" : "text-emerald-600"
                                    }`}
                            >
                                {item.profitLossPercent}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}
