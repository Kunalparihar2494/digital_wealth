import { HomeComponent } from "@/src/components/DashboardComponent/HomeComponent";
import Header from "@/src/components/shared/Header";
import { useShareStore } from "@/src/store/shares.store";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

export default function Home() {
    const { data, loading, fetchShares } = useShareStore();

    useEffect(() => {
        if (!data) fetchShares();
    }, [])


    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
                {/* You can add color by: <ActivityIndicator size="large" color="#000" /> */}
            </View>
        );
    }

    return (
        <>
            <Header />
            <View className="flex-1 bg-gray-100">

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 12, paddingBottom: 120 }}
                >
                    <HomeComponent data={data} />
                </ScrollView>


            </View>
        </>

    );
}
