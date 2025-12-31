import { IShareDetail } from "@/src/model/shares.interface";
import { Plus } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ShareCardProps {
    share: IShareDetail;
    onPress?: () => void;
}

export default function ShareCard({ share, onPress }: ShareCardProps) {
    return (
        <View className="px-3 mb-3">
            <View className="bg-white rounded-xl px-4 py-4 shadow-sm border border-gray-100">

                {/* COMPANY NAME */}
                <Text className="text-base font-semibold text-gray-800 mb-2">
                    {share.company}
                </Text>

                {/* PRICE + LOT SIZE */}
                <View className="flex-row justify-between items-center mb-4">
                    <View>
                        <Text className="text-xs text-gray-500">Price</Text>
                        <Text className="text-sm font-semibold text-emerald-600">
                            ₹{share.price ?? "-"}
                        </Text>
                    </View>

                    <View className="items-end">
                        <Text className="text-xs text-gray-500">Min Qty</Text>
                        <Text className="text-sm font-semibold text-gray-800">
                            {share.minQuantity ?? "-"}
                        </Text>
                    </View>
                </View>

                {/* BUY BUTTON */}
                <TouchableOpacity
                    onPress={onPress}
                    activeOpacity={0.85}
                    className="flex-row items-center justify-center bg-emerald-600 py-2.5 rounded-lg"
                >
                    <Plus size={18} color="white" />
                    <Text className="text-white font-semibold ml-2">
                        Buy
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}
