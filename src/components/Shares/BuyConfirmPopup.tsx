import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Props = {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    company: string;
    total?: number;
    price: number | string;
    quantity: number;
};

export default function BuyConfirmPopup({
    visible,
    onClose,
    onConfirm,
    company,
    total,
    price,
    quantity,
}: Props) {

    const parsePrice = (p: number | string) => {
        if (typeof p === "number") return p;
        const cleaned = String(p).replace(/[^0-9.-]+/g, "");
        const parsed = parseFloat(cleaned);
        return Number.isFinite(parsed) ? parsed : 0;
    };

    total = parsePrice(price) * quantity;
    const formattedTotal = total.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <SafeAreaProvider>
            <Modal visible={visible} transparent animationType="slide">
                <View className="flex-1 bg-black/40 justify-end">
                    <View className="bg-white rounded-t-2xl p-6">
                        <Text className="text-lg font-semibold text-gray-900 mb-4">
                            Confirm Buy
                        </Text>

                        <View className="mb-4">
                            <Text className="text-gray-600">Company</Text>
                            <Text className="font-semibold">{company}</Text>
                        </View>

                        <View className="flex-row justify-between mb-2">
                            <Text className="text-gray-600">Price</Text>
                            <Text>{price}</Text>
                        </View>

                        <View className="flex-row justify-between mb-2">
                            <Text className="text-gray-600">Quantity</Text>
                            <Text>{quantity}</Text>
                        </View>

                        <View className="flex-row justify-between mb-4">
                            <Text className="text-gray-900 font-semibold">Total</Text>
                            <Text className="text-gray-900 font-semibold">
                                ₹{formattedTotal}
                            </Text>
                        </View>

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                className="flex-1 border border-gray-300 py-3 rounded-xl"
                                onPress={onClose}
                            >
                                <Text className="text-center text-gray-700">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="flex-1 bg-emerald-600 py-3 rounded-xl"
                                onPress={onConfirm}
                            >
                                <Text className="text-center text-white font-semibold">
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaProvider>
    );
}
