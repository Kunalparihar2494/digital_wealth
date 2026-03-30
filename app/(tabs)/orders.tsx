import OrderCard from "@/src/components/Orders/OrderCard";
import Header from "@/src/components/shared/Header";
import TabMenu from "@/src/components/TabMenu";
import { useDashboardStore } from "@/src/store/dashboard.store";
import { useEffect, useMemo, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

// const TABS = ["Total Orders", "Completed", "In Progress", "Rejected"];
const TABS = ["Completed", "In Progress", "Rejected"];

export default function Order() {
    const [activeTab, setActiveTab] = useState("Completed");
    const { data, loading, fetchDashboard } = useDashboardStore();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!loading) fetchDashboard();
    }, []);

    const inProgressOrders = data?.inProgressOrders ?? [];
    const completedOrders = data?.completedOrders ?? [];
    const rejectedOrders = data?.rejectedOrders ?? [];


    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await fetchDashboard();
        } catch (error) {
            console.log("Refresh error:", error);
        } finally {
            setRefreshing(false);
        }
    };

    const tabCounts = useMemo(() => ({
        "Completed": completedOrders.length,
        "In Progress": inProgressOrders.length,
        "Rejected": rejectedOrders.length,
    }), [completedOrders, inProgressOrders, rejectedOrders]);

    // 🔹 Orders to show per tab
    const filteredOrders = useMemo(() => {
        switch (activeTab) {
            case "Completed":
                return completedOrders;
            case "In Progress":
                return inProgressOrders;
            case "Rejected":
                return rejectedOrders;
            default:
                return;
        }
    }, [activeTab, completedOrders, inProgressOrders, rejectedOrders]);

    return (
        <View className="flex-1 bg-gray-100">
            <Header />
            <View className="mb-2">
                <TabMenu
                    tabs={TABS}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                    counts={tabCounts}
                />
            </View>


            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <OrderCard order={item} />}
                contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingBottom: 120,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor="#10b981"
                        title="Refreshing..."
                    />
                }
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center mt-40">
                        <Text className="text-gray-500">No Orders Found</Text>
                    </View>
                }
            />
        </View>
    );
}
