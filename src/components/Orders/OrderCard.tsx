import React from "react";
import { Text, View } from "react-native";

type Order = {
    shareName: string;
    quantity: number;
    totalPrice: number;
    status: string;
    createdAt: string;
};

export default function OrderCard({ order }: { order: Order }) {
    const isRejected = order.status === "Rejected";
    const isConfirmed = order.status === "Confirmed";

    return (
        <View className="bg-white rounded-xl px-4 py-3 mb-3 shadow-sm">
            {/* Share name */}
            <Text className="font-semibold text-gray-900">
                {order.shareName}
            </Text>

            {/* Qty + Price */}
            <View className="flex-row justify-between mt-2">
                <Text className="text-gray-600 text-sm">
                    Qty: {order.quantity}
                </Text>
                <Text className="font-semibold text-gray-900">
                    ₹{order.totalPrice.toLocaleString()}
                </Text>
            </View>

            {/* Status */}
            <View className="flex-row justify-between mt-2">
                <Text className="text-xs text-gray-400">
                    {new Date(order.createdAt).toDateString()}
                </Text>

                <Text
                    className={`text-xs font-semibold ${isConfirmed
                        ? "text-emerald-600"
                        : isRejected
                            ? "text-red-500"
                            : "text-amber-600"
                        }`}
                >
                    {order.status}
                </Text>
            </View>
        </View>
    );
}
