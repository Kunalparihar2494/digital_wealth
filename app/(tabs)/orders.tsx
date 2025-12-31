

import OrderCard from "@/src/components/Orders/OrderCard";
import Header from "@/src/components/shared/Header";
import TabMenu from "@/src/components/TabMenu";
import { useDashboardStore } from "@/src/store/dashboard.store";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";

const TABS = ["Total Orders", "Confirmed", "Pending", "Cancelled"];

const STATUS_MAP: Record<string, string[]> = {
    "Total Orders": [],
    Confirmed: ["Confirmed"],
    Pending: ["Created", "Pending"],
    Cancelled: ["Cancelled", "Rejected"],
};

export default function Order() {
    const [activeTab, setActiveTab] = useState("Total Orders");
    const { data, loading, fetchDashboard } = useDashboardStore();

    useEffect(() => {
        if (!data) fetchDashboard();
    }, [])

    const orders = data?.orders ?? [];
    const recentOrders = data?.recentOrders ?? [];

    const tabCounts = useMemo(() => {
        if (!orders.length) {
            return {
                "Total Orders": 0,
                Confirmed: 0,
                Pending: 0,
                Cancelled: 0,
            };
        }

        return {
            "Total Orders": orders.length,
            Confirmed: orders.filter(o => o.status === "Confirmed").length,
            Pending: orders.filter(o =>
                ["Created", "Pending"].includes(o.status)
            ).length,
            Cancelled: orders.filter(o =>
                ["Cancelled", "Rejected"].includes(o.status)
            ).length,
        };
    }, [orders]);


    const filteredOrders = useMemo(() => {
        if (activeTab === "Total Orders") return orders;

        return orders.filter((o: any) =>
            STATUS_MAP[activeTab].includes(o.status)
        );
    }, [activeTab, orders]);
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
                    paddingHorizontal: 5,
                    paddingTop: 0,
                    paddingBottom: 500
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
