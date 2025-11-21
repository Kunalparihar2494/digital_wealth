import { View, Text } from "react-native";

export default function ComingSoon() {
    return (
        <View className="flex-1 bg-white items-center justify-center px-6">
            <Text className="text-4xl font-extrabold text-blue-600 mb-2">
                Coming Soon
            </Text>
            <Text className="text-gray-500 text-center text-base">
                This feature is under development.
                Stay tuned!
            </Text>
        </View>
    );
}
