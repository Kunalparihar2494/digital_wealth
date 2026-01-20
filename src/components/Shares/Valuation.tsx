// src/components/ShareDetail/ValuationSection.tsx
import { Text, View } from "react-native";
import InfoRowCard from "./InfoCard";


type Props = {
    marketCap: string;
    yearLow: string;
    yearHigh: string;
    peRatio: string;
    minQuantity: string;
};

export default function ValuationSection({
    marketCap,
    yearLow,
    yearHigh,
    peRatio,
    minQuantity
}: Props) {
    return (
        <View className="mx-4">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-800">Valuation</Text>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                    <Text className="text-green-700 text-xs">Figures in ₹</Text>
                </View>
            </View>

            <InfoRowCard title="Valuation" value={marketCap} subtitle="Market Cap" />
            <InfoRowCard
                title="Yearly Range"
                value={`${yearLow} - ${yearHigh}`}
                subtitle="52 week range"
            />
            <InfoRowCard title="P/E" value={peRatio} subtitle="Price to Earnings" />
            <InfoRowCard title="Minimum Quantity" value={minQuantity} subtitle="Minimum Quantity User Needs To Buy" />
        </View>
    );
}
