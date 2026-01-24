import OrderCard from "@/src/components/Orders/OrderCard";
import Header from "@/src/components/shared/Header";
import TabMenu from "@/src/components/TabMenu";
import { useDashboardStore } from "@/src/store/dashboard.store";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";

const TABS = ["Total Orders", "Completed", "In Progress", "Rejected"];

export default function Order() {
    const [activeTab, setActiveTab] = useState("Total Orders");
    const { data, loading, fetchDashboard } = useDashboardStore();

    useEffect(() => {
        if (!loading) fetchDashboard();
    }, []);

    const inProgressOrders = data?.inProgressOrders ?? [];
    const completedOrders = data?.completedOrders ?? [];
    const rejectedOrders = data?.rejectedOrders ?? [];

    // 🔹 Combine all orders for "Total Orders"
    const allOrders = useMemo(
        () => [...inProgressOrders, ...completedOrders, ...rejectedOrders],
        [inProgressOrders, completedOrders, rejectedOrders]
    );

    // 🔹 Tab counts
    const tabCounts = useMemo(() => ({
        "Total Orders": allOrders.length,
        "Completed": completedOrders.length,
        "In Progress": inProgressOrders.length,
        "Rejected": rejectedOrders.length,
    }), [allOrders, completedOrders, inProgressOrders, rejectedOrders]);

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
                return allOrders;
        }
    }, [activeTab, allOrders, completedOrders, inProgressOrders, rejectedOrders]);

    return (
        <View className="flex-1 bg-gray-100">
            <Header />

            <TabMenu
                tabs={TABS}
                activeTab={activeTab}
                onChange={setActiveTab}
                counts={tabCounts}
            />

            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <OrderCard order={item} />}
                contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingBottom: 120,
                }}
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center mt-40">
                        <Text className="text-gray-500">No Orders Found</Text>
                    </View>
                }
            />
        </View>
    );
}
