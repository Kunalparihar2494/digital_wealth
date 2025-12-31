import { useWalletStore } from "@/src/store/wallet.store";
import React, { useEffect } from "react";
import {
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type SharePopupProps = {
    visible: boolean;
    onClose: () => void;
    share: {
        company: string;
        price: number | string;
        minQuantity: number;
    } | null;
    onBuy?: () => void;
};

export default function SharePopup({
    visible,
    onClose,
    share,
    onBuy,
}: SharePopupProps) {
    const { data, loading, fetchBalance } = useWalletStore();

    useEffect(() => {
        if (!data) fetchBalance();
    }, [])

    if (!share) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            className=""
        >
            {/* Backdrop */}
            <Pressable
                className="flex-1 bg-black/40 justify-end"
                onPress={onClose}
            />

            {/* Popup Card */}
            <View className="bg-white rounded-t-3xl px-5 py-6">
                {/* Header */}
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                    {share.company}
                </Text>

                {/* Details */}
                <View className="flex-row justify-between mb-4">
                    <View>
                        <Text className="text-xs text-gray-500">Price</Text>
                        <Text className="text-base font-semibold">
                            {share.price}
                        </Text>
                    </View>

                    <View>
                        <Text className="text-xs text-gray-500">Min Qty</Text>
                        <Text className="text-base font-semibold">
                            {share.minQuantity}
                        </Text>
                    </View>
                </View>

                {/* Buy Button */}
                <TouchableOpacity
                    onPress={onBuy}
                    className="bg-emerald-600 py-3 rounded-xl"
                    activeOpacity={0.8}
                >
                    <Text className="text-white text-center font-semibold text-base">
                        Buy
                    </Text>
                </TouchableOpacity>

                {/* Close */}
                <TouchableOpacity onPress={onClose} className="mt-3">
                    <Text className="text-center text-gray-500">Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
