import { ICreateOrder } from "@/src/model/shares.interface";
import { buyShares } from "@/src/services/shares";
import { useWalletStore } from "@/src/store/wallet.store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BuyConfirmPopup from "../Shares/BuyConfirmPopup";

type SharePopupProps = {
    visible: boolean;
    onClose: () => void;
    share: {
        id: number;
        company: string;
        price: number | string;
        minQuantity: number;
    } | null;
};

export default function SharePopup({
    visible,
    onClose,
    share,
}: SharePopupProps) {
    const { data, fetchBalance } = useWalletStore();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [quantity, setQuantity] = useState<number>(share?.minQuantity ?? 0);

    useEffect(() => {
        if (share?.minQuantity) {
            setQuantity(share.minQuantity);
        }
    }, [share]);

    useEffect(() => {
        if (!data) fetchBalance();
    }, []);

    const parsePrice = (p: number | string) => {
        if (typeof p === "number") return p;
        return parseFloat(String(p).replace(/[^0-9.]/g, "")) || 0;
    };

    const price = parsePrice(share?.price ?? 0);
    const totalAmount = price * quantity;

    const handleBuy = async () => {
        setConfirmOpen(false);

        if (!quantity || quantity < (share?.minQuantity ?? 0)) {
            Alert.alert(
                "Invalid Quantity",
                `Minimum quantity is ${share?.minQuantity}`
            );
            return;
        }

        if (!data || totalAmount > data.balance) {
            Alert.alert("Insufficient Balance", "Please recharge your wallet");
            router.replace("/(pages)/wallet");
        }

        try {
            const result: ICreateOrder = await buyShares(
                share!.id,
                quantity
            );

            if (result.success) {
                Alert.alert("Success", "Share bought successfully");
                onClose();
            } else {
                Alert.alert("Failure", result.message ?? "Order failed");
            }
        } catch {
            Alert.alert("Error", "Unable to place order");
        }
    };

    if (!share) return null;

    return (
        <SafeAreaProvider>
            <Modal
                className=""
                transparent
                visible={visible}
                animationType="slide"
                onRequestClose={onClose}
            >
                {/* Backdrop */}
                <Pressable
                    className="flex-1 bg-black/40 justify-end"
                    onPress={onClose}
                />

                {/* Popup */}
                <View className="bg-white rounded-t-3xl px-5 py-8 bottom-0">
                    {/* Header */}
                    <Text className="text-lg font-semibold text-gray-800 mb-4">
                        {share.company}
                    </Text>

                    {/* Price (Read only) */}
                    <View className="mb-4">
                        <Text className="text-xs text-gray-500">Price</Text>
                        <Text className="text-base font-semibold">
                            ₹ {price}
                        </Text>
                    </View>

                    {/* Quantity (Editable) */}
                    <View className="mb-4">
                        <Text className="text-xs text-gray-500">
                            Quantity (Min {share.minQuantity})
                        </Text>
                        <TextInput
                            value={String(quantity)}
                            keyboardType="numeric"
                            onChangeText={(val) =>
                                setQuantity(Number(val.replace(/[^0-9]/g, "")))
                            }
                            className="border border-gray-300 rounded-xl px-4 py-2 text-base"
                        />
                    </View>

                    {/* Total */}
                    <View className="flex-row justify-between mb-6">
                        <Text className="text-gray-500 text-sm">
                            Total Amount
                        </Text>
                        <Text className="text-gray-900 font-semibold">
                            ₹ {totalAmount.toLocaleString("en-IN")}
                        </Text>
                    </View>

                    {/* Buy */}
                    <TouchableOpacity
                        onPress={() => setConfirmOpen(true)}
                        className="bg-emerald-600 py-3 rounded-xl"
                        activeOpacity={0.85}
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

            {/* CONFIRMATION */}
            <BuyConfirmPopup
                visible={confirmOpen}
                company={share.company}
                price={price}
                quantity={quantity}
                total={totalAmount}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleBuy}
            />
        </SafeAreaProvider>
    );
}
