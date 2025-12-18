
import ComingSoon from "@/src/components/shared/Comingsoon";
import Header from "@/src/components/shared/Header";
import { IShare, IShareDetail } from "@/src/model/shares.interface";
import { getShares } from "@/src/services/shares";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";

export default function Shares() {
    const [loading, setLoading] = useState(false);
    const [shares, setShares] = useState<IShareDetail[]>([]);
    // const [shares, setShares] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {
        getShare();
    }, [])

    const filteredShares = shares.filter((item) => {
        const text = search.toLowerCase();
        return (
            item.company.toLowerCase().includes(text) ||
            item.brandName.toLowerCase().includes(text)
        );
    });


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
            Alert.alert(
                "Error",
                "Something went wrong. Please try again later.",
                [
                    {
                        text: "OK",
                        onPress: () => router.replace("/(auth)/login"), // redirect to login
                    },
                ]
            );
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
        <View className="flex-1">
            <Header />
            {/* <Text className="text-2xl mt-10 font-bold text-center mb-6 text-gray-600">
                Unlisted Shares
            </Text>

            <SearchBar value={search} onChangeText={setSearch} />

            <ScrollView showsVerticalScrollIndicator={false}>
                {filteredShares.length > 0 ? (
                    filteredShares.map((s: any) => (
                        <ShareCard key={s.id} {...s} />
                    ))
                ) : (
                    <Text className="text-center text-gray-500 mt-10">
                        No shares found.
                    </Text>
                )}
            </ScrollView> */}
            <ComingSoon />
        </View>
    );
}
