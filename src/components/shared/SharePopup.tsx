import { ICreateOrder } from "@/src/model/shares.interface";
import { buyShares } from "@/src/services/shares";
import { useWalletStore } from "@/src/store/wallet.store";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
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
    onBuy?: () => void;
};

export default function SharePopup({
    visible,
    onClose,
    share,
    onBuy,
}: SharePopupProps) {
    const { data, loading, fetchBalance } = useWalletStore();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const parsePrice = (p: number | string) => {
        if (typeof p === "number") return p;
        const cleaned = String(p).replace(/[^0-9.-]+/g, "");
        const parsed = parseFloat(cleaned);
        return Number.isFinite(parsed) ? parsed : 0;
    };

    const handleBuy = () => {
        setConfirmOpen(false);
        if (share?.price && share?.minQuantity) {
            const total = parsePrice(share?.price) * share?.minQuantity;
            const formattedTotal = total.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            if (data) {
                if (parsePrice(formattedTotal) > data?.balance) {
                    Alert.alert("Failure", "Please recharge your wallet");
                } else {
                    handleBuyShares();
                }

            }
        }
    }

    const handleBuyShares = async () => {
        try {
            const result: ICreateOrder = await buyShares(share?.id, share?.minQuantity);
            if (result.success) {
                Alert.alert("Success", "Share bought successfully");
            }
            else {
                Alert.alert("Failure", "Please recharge your wallet");
            }

        } catch (error: any) {

        }
    }


    useEffect(() => {
        if (!data) fetchBalance();
    }, [])

    if (!share) return null;

    return (
        <>
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
                        onPress={() => {
                            onClose();
                            setConfirmOpen(true);
                        }}
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

            <BuyConfirmPopup
                visible={confirmOpen}
                company={share.company}
                price={share.price}
                quantity={share.minQuantity}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleBuy}
            />
        </>
    );
}
