import { Text, View } from "react-native";

export function FundsSummary({
    available,
    used,
}: {
    available: number;
    used: number;
}) {
    return (
        <View className="flex-row justify-between mb-4">
            <View>
                <Text className="text-gray-400 text-sm">Available cash</Text>
                <Text className="text-white text-xl font-semibold">{available}</Text>
            </View>

            <View>
                <Text className="text-gray-400 text-sm">Used margin</Text>
                <Text className="text-white text-xl font-semibold">{used}</Text>
            </View>
        </View>
    );
}
