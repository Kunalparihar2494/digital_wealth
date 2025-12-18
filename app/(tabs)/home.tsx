import { AboutComponent } from "@/src/components/DashboardComponent/AboutComponent";
import { HomeComponent } from "@/src/components/DashboardComponent/HomeComponent";
import ComingSoonContent from "@/src/components/shared/ComingSoonTab";
import Header from "@/src/components/shared/Header";
import TabMenu from "@/src/components/TabMenu";
import { IDashboard } from "@/src/model/dashboard.interface";
import { useDashboardStore } from "@/src/store/dashboard.store";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

const TABS = ["Home", "About", "Pre-IPOs", "Upcoming", "Companies"];

export default function Home() {
    const [dashBoardData, setDashBoardData] = useState<IDashboard>();
    const [activeTab, setActiveTab] = useState("Home");
    const { data, loading, fetchDashboard } = useDashboardStore();

    useEffect(() => {
        fetchDashboard();
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
        // <View className="flex-1">
        //     <Header />
        //     <ScrollView showsVerticalScrollIndicator={false} className="">
        //         <View className="p-2">
        //             {!(dashBoardData?.isKycIncomplete) &&
        //                 <View>
        //                     <KYCCard
        //                         onPress={() => console.log("Go to KYC screen")}
        //                     />
        //                 </View>
        //             }
        //             <View className="flex-row mb-4 mt-6 items-center">
        //                 <StatCard
        //                     title="Total Orders"
        //                     value={dashBoardData?.totalOrders ?? 0}
        //                     icon="cart"
        //                     colors={{
        //                         cardBg: "#FFFFFF",
        //                         iconBg: "#D7F5FC",
        //                         icon: "#16C7EE",
        //                     }}
        //                 />
        //                 <StatCard
        //                     title="Cancelled Orders"
        //                     value={dashBoardData?.cancelledOrders ?? 0}
        //                     icon="cancel"
        //                     colors={{
        //                         cardBg: "#FFFFFF",
        //                         iconBg: "#FFF7ED",
        //                         icon: "#F97316",
        //                     }}
        //                 />
        //             </View>

        //             <View className="flex-row mb-4">
        //                 <StatCard
        //                     title="Confirmed Orders"
        //                     value={dashBoardData?.confirmedOrders ?? 0}
        //                     icon="confirm"
        //                     colors={{
        //                         cardBg: "#FFFFFF",
        //                         iconBg: "#ECFDF5",
        //                         icon: "#10B981",
        //                     }}
        //                 />
        //                 <StatCard
        //                     title="Pending Orders"
        //                     value={dashBoardData?.pendingOrders ?? 0}
        //                     icon="pending"
        //                     colors={{
        //                         cardBg: "#FFFFFF",
        //                         iconBg: "#FFF2D6",
        //                         icon: "#FFB010",
        //                     }}
        //                 />
        //             </View>

        //             {/* Recent Orders */}
        //             <DashboardCard title="Recent Orders">
        //                 {!dashBoardData?.recentOrders || dashBoardData.recentOrders.length < 1 && <EmptyMessage message="No orders found." />}
        //                 <DashBoardTable
        //                     columns={[
        //                         { label: "Share", key: "shareName" },
        //                         { label: "Qty", key: "quantity" },
        //                         { label: "Price", key: "totalPrice" },
        //                         { label: "Status", key: "status" },
        //                     ]}
        //                     data={dashBoardData?.recentOrders ?? []}
        //                 />
        //             </DashboardCard>

        //             {/* Monthly Transactions */}
        //             {/* <DashboardCard title="Monthly Transactions">
        //                 <EmptyMessage message="No transaction data available." />
        //             </DashboardCard> */}

        //             {/* Order Status Distribution */}
        //             {/* <DashboardCard title="Order Status Distribution">
        //                 <EmptyMessage message="No data available." />
        //             </DashboardCard> */}
        //         </View>
        //     </ScrollView>
        // </View>
        <>
            <Header />
            <View className="flex-1 bg-gray-100">
                <TabMenu
                    tabs={TABS}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                {/* CONTENT */}
                {activeTab === "Home" && (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingTop: 12, paddingBottom: 120 }}
                    >
                        <HomeComponent />
                    </ScrollView>
                )}

                {activeTab === "About" && (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingTop: 12, paddingBottom: 120 }}
                    >
                        <AboutComponent />
                    </ScrollView>
                )}

                {activeTab !== "Home" && (
                    <View className="flex-1">
                        <ComingSoonContent
                            title={activeTab}
                            subtitle="This section will be live soon."
                        />
                    </View>
                )}
            </View>
        </>

    );
}
