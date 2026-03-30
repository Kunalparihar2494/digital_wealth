import { HomeComponent } from "@/src/components/DashboardComponent/HomeComponent";
import Header from "@/src/components/shared/Header";
import { useShareStore } from "@/src/store/shares.store";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";

export default function Home() {
    const { data, loading, fetchShares } = useShareStore();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!data) fetchShares();
    }, [])

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await fetchShares();
        } catch (error) {
            console.log("Refresh error:", error);
        } finally {
            setRefreshing(false);
        }
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
        <>
            <Header />
            <View className="flex-1 bg-gray-100">

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 12, paddingBottom: 120 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            tintColor="#10b981"
                            title="Refreshing..."
                        />
                    }
                >
                    {data && <HomeComponent data={data} />}
                </ScrollView>


            </View>
        </>

    );
}
