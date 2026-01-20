
import Header from "@/src/components/shared/Header";
import ShareCard from "@/src/components/shared/ShareCard";
import SharePopup from "@/src/components/shared/SharePopup";
import ShareSearch from "@/src/components/shared/ShareSearch";
import { IShare, IShareDetail } from "@/src/model/shares.interface";
import { getShares } from "@/src/services/shares";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";

export default function Shares() {
    const [loading, setLoading] = useState(false);
    const [shares, setShares] = useState<IShareDetail[]>([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedShare, setSelectedShare] = useState<IShareDetail | null>(null);

    useEffect(() => {
        fetchShares();
    }, []);

    const fetchShares = async () => {
        try {
            setLoading(true);
            const data: IShare = await getShares();
            setShares(data?.shares ?? []);
        } catch (err) {
            Alert.alert("Error", "Unable to load shares");
        } finally {
            setLoading(false);
        }
    };

    /** 🔍 FILTERED SHARES */
    const filteredShares = useMemo(() => {
        if (!search.trim()) return shares;

        const text = search.toLowerCase();
        return shares.filter(
            (s) =>
                s.company?.toLowerCase().includes(text) ||
                s.brandName?.toLowerCase().includes(text)
        );
    }, [search, shares]);

    const handleBuy = (share: IShareDetail) => {
        setSelectedShare(share);
        setOpen(true);
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
                {/* You can add color by: <ActivityIndicator size="large" color="#000" /> */}
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <Header />

            <Text className="text-2xl font-bold text-center mt-6 mb-4 text-gray-700">
                Unlisted Shares
            </Text>

            {/* 🔍 SEARCH */}
            <View className="mx-4 mb-4">
                <ShareSearch value={search} onChange={setSearch} />
            </View>

            {/* 📃 LIST */}
            <FlatList
                data={filteredShares}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ShareCard
                        share={item}
                        onPress={() => handleBuy(item)}
                    />
                )}
                ListEmptyComponent={
                    <Text className="text-center text-gray-500 mt-10">
                        No shares found
                    </Text>
                }
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            />

            {/* 🧾 BUY POPUP */}
            {selectedShare && (
                <SharePopup
                    visible={open}
                    onClose={() => setOpen(false)}
                    share={{
                        id: selectedShare?.id ?? 0,
                        company: selectedShare?.company ?? '',
                        price: selectedShare?.price ?? 0,
                        minQuantity:
                            typeof selectedShare?.minQuantity === "string"
                                ? parseInt(selectedShare.minQuantity, 10)
                                : selectedShare?.minQuantity ?? 0,
                    }}
                />
            )}
        </View>
    );
}
