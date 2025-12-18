import { Text, View } from "react-native";

type Props = {
    title: string;
    value: number;
    bg: string;
    color: string;
};

export function StatCard({ title, value, bg, color }: Props) {
    return (
        <View className="flex-1 rounded-xl p-4 shadow-md" style={{ backgroundColor: bg }}>
            <Text className="text-gray-500 text-xs">{title}</Text>
            <Text className="text-xl font-bold" style={{ color }}>
                {value}
            </Text>
        </View>
    );
}
