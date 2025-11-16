import Header from "@/src/components/Header";
import SafeAreaWrapper from "@/src/components/SafeAreaWrapper";
import ShareCard from "@/src/components/ShareCard";
import { IShare, IShareDetail } from "@/src/model/shares.interface";
import { getShares } from "@/src/services/shares";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, ActivityIndicator } from "react-native";

export default function Shares() {
    const [loading, setLoading] = useState(false);
    const [shares, setShares] = useState<IShareDetail[]>([]);

    useEffect(() => {
        getShare();
    }, [])

    const getShare = async () => {
        try {
            setLoading(true);
            const data: IShare = await getShares();
            if (data) {
                setShares(data.shares ?? data.orders ?? []);
            } else {
                Alert.alert("Data Failed");
            }
        } catch (err: any) {
            console.log("getShare error:", err.message ?? err);
            Alert.alert("Error", "Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
                {/* You can add color by: <ActivityIndicator size="large" color="#000" /> */}
            </View>
        );
    }

    return (
        <View className="">
            <Header />
            <Text className="text-2xl mt-10 font-bold text-center mb-6 text-gray-900">
                Unlisted Shares
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                {shares && shares.map((s: any) => (
                    <ShareCard key={s.id} {...s} />
                ))}
            </ScrollView>
        </View>
    );
}
