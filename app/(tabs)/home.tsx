import DashboardCard from "@/src/components/DashboardCard";
import EmptyMessage from "@/src/components/EmptyMessage";
import KYCCard from "@/src/components/KYCScreen";
import StatCard from "@/src/components/StatCard";
import { IDashboard } from "@/src/model/dashboard.interface";
import { getDashboardDetails } from "@/src/services/home";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import Header from "../../src/components/Header";

export default function Home() {

    const [loading, setLoading] = useState(false);
    const [dashBoardData, setDashBoardData] = useState<IDashboard>();


    useEffect(() => {
        getDetails();
    }, [])


    const getDetails = async () => {
        try {
            setLoading(true);
            const data: IDashboard = await getDashboardDetails();
            if (data) {
                setDashBoardData(data);
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
            <ScrollView showsVerticalScrollIndicator={false} className="">
                <View className="p-2">
                    {!(dashBoardData?.isKycIncomplete) &&
                        <View>
                            <KYCCard
                                onPress={() => console.log("Go to KYC screen")}
                            />
                        </View>
                    }
                    <View className="flex-row mb-4 mt-6 items-center">
                        <StatCard
                            title="Total Orders"
                            value={dashBoardData?.totalOrders ?? 0}
                            icon="cart"
                            colors={{ bg: "#1c5894", icon: "#fff" }}
                        />
                        <StatCard
                            title="Cancelled Orders"
                            value={dashBoardData?.cancelledOrders ?? 0}
                            icon="cancel"
                            colors={{ bg: "#1c5894", icon: "#fff" }}
                        />
                    </View>

                    <View className="flex-row mb-4">
                        <StatCard
                            title="Confirmed Orders"
                            value={dashBoardData?.confirmedOrders ?? 0}
                            icon="confirm"
                            colors={{ bg: "#1c5894", icon: "#fff" }}
                        />
                        <StatCard
                            title="Pending Orders"
                            value={dashBoardData?.pendingOrders ?? 0}
                            icon="pending"
                            colors={{ bg: "#1c5894", icon: "#fff" }}
                        />
                    </View>

                    {/* Recent Orders */}
                    <DashboardCard title="Recent Orders">
                        <EmptyMessage message="No orders found." />
                    </DashboardCard>

                    {/* Monthly Transactions */}
                    <DashboardCard title="Monthly Transactions">
                        <EmptyMessage message="No transaction data available." />
                    </DashboardCard>

                    {/* Order Status Distribution */}
                    <DashboardCard title="Order Status Distribution">
                        <EmptyMessage message="No data available." />
                    </DashboardCard>
                </View>
            </ScrollView>
        </View>
    );
}
