import { Text, TouchableOpacity, View } from "react-native";

export default function KycBanner({ onPress }: { onPress: () => void }) {
    return (
        <View className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 mb-4">
            <Text className="text-yellow-800 font-semibold">
                KYC Incomplete
            </Text>
            <Text className="text-yellow-700 text-sm mt-1">
                Complete your KYC to start investing.
            </Text>

            <TouchableOpacity onPress={onPress} className="mt-3">
                <Text className="text-yellow-900 font-semibold">
                    Complete KYC →
                </Text>
            </TouchableOpacity>
        </View>
    );
}
