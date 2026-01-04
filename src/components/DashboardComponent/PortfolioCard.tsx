// src/components/PortfolioCard.tsx
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import SharePopup from "../shared/SharePopup";

export default function PortfolioCard({
    id,
    title,
    amount,
    image,
    minQuantity
}: {
    id: number,
    title: string;
    amount: string;
    image?: string;
    minQuantity?: string | number;
}) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <TouchableOpacity
                onPress={() => setOpen(true)}
                activeOpacity={0.8}
            >
                <View className="bg-white rounded-2xl p-4 w-44 mr-4 shadow-sm">
                    {image ? (
                        <Image
                            source={{ uri: `https://digitalwealth.in/upload/${image}` }}
                            className="w-8 h-8 mb-3 rounded-md"
                        />
                    ) : (
                        <View className="w-8 h-8 rounded-lg bg-emerald-100 mb-3" />
                    )}

                    <Text className="text-gray-700 font-medium" numberOfLines={2}>
                        {title}
                    </Text>
                    <Text className="text-gray-900 font-semibold mt-1">{amount}</Text>
                </View>
            </TouchableOpacity>
            <SharePopup
                visible={open}
                onClose={() => setOpen(false)}
                share={{
                    id: id,
                    company: title,
                    price: amount,
                    minQuantity:
                        typeof minQuantity === "string"
                            ? parseInt(minQuantity, 10)
                            : minQuantity ?? 0,
                }}
            />
        </>
    );
}
