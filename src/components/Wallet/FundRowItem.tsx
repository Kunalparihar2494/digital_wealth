import { Text, View } from "react-native";

export function FundsRowItem({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <View className="flex-row justify-between py-4 border-b border-gray-800">
            <Text className="text-gray-400">{label}</Text>
            <Text className="text-white font-medium">
                {value.toFixed(2)}
            </Text>
        </View>
    );
}
