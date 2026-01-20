// src/components/ShareDetail/BottomActionBar.tsx
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SharePopup from "../shared/SharePopup";

type ShareDetails = {
    share: {
        id: number;
        company: string;
        price: number | string;
        minQuantity: number;
    } | null;
    onBuy?: () => void;
};

export default function BottomActionBar({
    share,
    onBuy,
}: ShareDetails) {
    const [open, setOpen] = useState(false);
    const handleBuy = () => {
        setOpen(true);
    };
    return (
        <SafeAreaProvider>
            <View className="absolute bottom-6 left-0 right-0 bg-white px-4 py-4 mb-8 flex-row gap-4 border-t border-gray-200">
                <TouchableOpacity onPress={handleBuy} className="flex-1 bg-green-600 py-4 rounded-xl">
                    <Text className="text-white text-center font-semibold text-base">
                        Invest Now
                    </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity className="flex-1 border-2 border-green-600 py-4 rounded-xl">
                <Text className="text-black-600 text-center font-semibold text-base">
                    Sell
                </Text>
            </TouchableOpacity> */}
            </View>
            {
                share && (
                    <SharePopup visible={open}
                        onClose={() => setOpen(false)}
                        share={{
                            id: share?.id ?? 0,
                            company: share?.company ?? '',
                            price: share?.price ?? 0,
                            minQuantity:
                                typeof share?.minQuantity === "string"
                                    ? parseInt(share.minQuantity, 10)
                                    : share?.minQuantity ?? 0,
                        }}

                    >

                    </SharePopup>
                )
            }

        </SafeAreaProvider>
    );
}
