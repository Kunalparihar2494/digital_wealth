// src/components/ShareDetail/InfoRowCard.tsx
import { Text, View } from "react-native";

type Props = {
    title: string;
    subtitle: string;
    value: string;
};

export default function InfoRowCard({ title, subtitle, value }: Props) {
    return (
        <View className="bg-white rounded-xl p-4 mb-3 shadow-sm flex-row justify-between items-center">
            <View>
                <Text className="text-gray-700 font-medium">{title}</Text>
                <Text className="text-gray-500 text-xs">{subtitle}</Text>
            </View>
            <Text className="text-gray-900 font-semibold">{value}</Text>
        </View>
    );
}
