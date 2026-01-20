// src/components/Dashboard/ProfitLossCard.tsx
import { Text, View } from "react-native";

type Props = {
    pnl: string;
    portfolioValue: string;
    percentage: string; // e.g. "12.4%" or "-8.2%"
    gains: string;
    isProfit: boolean;
};

export default function ProfitLossCard({
    pnl,
    portfolioValue,
    percentage,
    gains,
    isProfit,
}: Props) {
    // convert "12.4%" → 12.4
    const percentValue = Math.min(
        Math.abs(parseFloat(percentage)) || 0,
        100
    );

    const barColor = isProfit ? "bg-emerald-500" : "bg-red-500";
    const textColor = isProfit ? "text-emerald-600" : "text-red-600";

    return (
        <View className="bg-white rounded-2xl p-5 shadow mb-5">
            {/* TOP */}
            <View className="flex-row justify-between mb-3">
                <View>
                    <Text className="text-gray-500 text-xs">Total P&amp;L</Text>
                    <Text className={`text-xl font-bold ${textColor}`}>
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

            {/* PROGRESS BAR */}
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden my-2">
                <View
                    className={`h-full ${barColor}`}
                    style={{ width: `${percentValue}%` }}
                />
            </View>

            {/* BOTTOM */}
            <View className="flex-row justify-between mt-1">
                <Text className="text-gray-500 text-xs">
                    {percentage} return
                </Text>

                <Text className={`text-xs font-medium ${textColor}`}>
                    {gains} {isProfit ? "gain" : "loss"}
                </Text>
            </View>
        </View>
    );
}
