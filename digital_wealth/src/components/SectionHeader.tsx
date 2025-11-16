import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface ShareCardProps {
    name: string;
    symbol: string;
    price: string;
    lotSize: string;
    color?: string;
    onPress?: () => void;
}

export default function ShareCard({
    name,
    symbol,
    price,
    lotSize,
    color = "#6366F1",
    onPress,
}: ShareCardProps) {
    return (
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center mb-3">
                <View
                    className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                    style={{ backgroundColor: color }}
                >
                    <Text className="text-white font-semibold text-xs">{symbol}</Text>
                </View>
                <Text className="text-base font-semibold flex-1 text-gray-900">
                    {name}
                </Text>
            </View>

            {/* <View className="flex-row justify-between mb-3">
                <View>
                    <Text className="text-sm text-gray-500">Price</Text>
                    <Text className="text-lg font-bold text-gray-800">₹{price}</Text>
                </View>
                <View className="items-end">
                    <Text className="text-sm text-gray-500">Lot Size</Text>
                    <Text className="text-lg font-bold text-gray-800">{lotSize}</Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={onPress}
                className="bg-green-600 py-3 rounded-full"
            >
                <Text className="text-white text-center font-semibold">
                    View Details
                </Text>
            </TouchableOpacity> */}
        </View>
    );
}
