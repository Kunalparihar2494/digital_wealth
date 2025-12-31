import { Text, View } from "react-native";

export function TransactionHeader({ onSeeAll }: { onSeeAll?: () => void }) {
    return (
        <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold text-gray-900">
                Transactions
            </Text>

            {/* <TouchableOpacity onPress={onSeeAll}>
                <Text className="text-sm text-emerald-600">
                    See all
                </Text>
            </TouchableOpacity> */}
        </View>
    );
}
