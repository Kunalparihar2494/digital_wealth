import { Text, View } from "react-native";

type Props = {
    title: string;
    subtitle?: string;
};

export default function ComingSoonContent({ title, subtitle }: Props) {
    return (
        <View className="items-center">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
                {title}
            </Text>

            <Text className="text-gray-500 text-center">
                {subtitle ?? "Coming soon"}
            </Text>
        </View>
    );
}
