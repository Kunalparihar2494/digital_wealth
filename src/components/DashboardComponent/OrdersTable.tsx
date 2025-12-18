import { Text, View } from "react-native";

export function OrdersTable({ data }: { data: any[] }) {
    if (!data || data.length === 0) {
        return (
            <Text className="text-center text-gray-400 py-6">
                No orders found
            </Text>
        );
    }

    return (
        <View className="bg-white rounded-xl overflow-hidden">
            {/* Header */}
            <View className="flex-row bg-gray-100 px-3 py-2">
                <Text className="flex-1 font-semibold">Share</Text>
                <Text className="w-16 text-center">Qty</Text>
                <Text className="w-20 text-right">Price</Text>
            </View>

            {/* Rows */}
            {data.map((item) => (
                <View
                    key={item.id}
                    className="flex-row px-3 py-3 border-t border-gray-100"
                >
                    <Text className="flex-1">{item.shareName}</Text>
                    <Text className="w-16 text-center">{item.quantity}</Text>
                    <Text className="w-20 text-right">
                        ₹{item.totalPrice.toLocaleString()}
                    </Text>
                </View>
            ))}
        </View>
    );
}
