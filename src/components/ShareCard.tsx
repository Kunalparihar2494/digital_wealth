import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ShoppingCart } from "lucide-react-native";

interface ShareCardProps {
    company: string;
    logo?: string;
    price?: string;
    minQuantity?: string;
    color?: string;
    onPress?: () => void;
}

export default function ShareCard({
    company,
    logo,
    price,
    minQuantity,
    color = "#ffffff",
    onPress,
}: ShareCardProps) {
    return (
        <View className="px-4 mb-4">
            <View className="bg-white rounded-2xl px-3 py-3 shadow">

                {/* Row: Logo + Company */}
                <View className="flex-row items-center justify-between mb-4">
                    <View
                        className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                        style={{ backgroundColor: color }}
                    >
                        <Image
                            source={{ uri: `https://digitalwealth.in/upload/${logo}` }}
                            style={{ width: 40, height: 40, resizeMode: "contain" }}
                        />
                    </View>
                    <View className="justify-end items-center" style={{ marginLeft: "auto", width: 200 }}>
                        <Text className="text-base font-semibold flex-1 text-gray-900">
                            {company}
                        </Text>
                    </View>
                </View>

                {/* Price + Lot Size */}
                <View className="flex-row justify-between mb-4">
                    <View>
                        <Text className="text-xs text-gray-500">Price</Text>
                        <Text className="text-lg font-semibold text-green-600">₹{price}</Text>
                    </View>

                    <View className="items-end" style={{ marginLeft: "auto" }}>
                        <Text className="text-xs text-gray-500">Lot Size</Text>
                        <Text className="text-lg font-semibold">{minQuantity}</Text>
                    </View>
                </View>

                {/* Button */}
                <TouchableOpacity
                    onPress={onPress}
                    activeOpacity={0.8}
                    className="w-full mt-auto rounded-xl"
                >
                    <LinearGradient
                        colors={["#667eea", "#764ba2"]}
                        className="w-full py-3 flex-row items-center justify-center gap-1.5"
                    >
                        <ShoppingCart color="white" size={16} mx-4 />
                        <Text className="text-white font-semibold text-sm">Buy Now</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </View>

    );
}
