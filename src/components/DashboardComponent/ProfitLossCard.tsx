// src/components/Dashboard/ProfitLossCard.tsx
import { Text, View } from "react-native";

type Props = {
    pnl: string;
    portfolioValue: string;
    percentage: string;
    gains: string;
};

export default function ProfitLossCard({
    pnl,
    portfolioValue,
    percentage,
    gains,
}: Props) {
    return (
        <View className="bg-white rounded-2xl p-4 shadow mb-5">
            <View className="flex-row justify-between mb-2">
                <View>
                    <Text className="text-gray-500 text-xs">Total P&L</Text>
                    <Text className="text-emerald-600 text-xl font-bold">
                        {pnl}
                    </Text>
                </View>

                <View>
                    <Text className="text-gray-500 text-xs text-right">
                        Portfolio Value
                    </Text>
                    <Text className="text-gray-900 font-semibold text-right">
                        {portfolioValue}
                    </Text>
                </View>
            </View>

            {/* Progress */}
            <View className="h-2 bg-gray-200 rounded-full my-2">
                <View className="h-full w-[70%] bg-emerald-500 rounded-full" />
            </View>

            <View className="flex-row justify-between">
                <Text className="text-gray-500 text-xs">
                    {percentage} return this month
                </Text>
                <Text className="text-emerald-600 text-xs font-medium">
                    {gains} gains
                </Text>
            </View>
        </View>
    );
}
