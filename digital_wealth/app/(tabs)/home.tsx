import { View, ScrollView } from "react-native";
import Header from "../../src/components/Header";
import KYCCard from "@/src/components/KYCScreen";
import StatCard from "@/src/components/StatCard";
import DashboardCard from "@/src/components/DashboardCard";
import EmptyMessage from "@/src/components/EmptyMessage";

export default function Home() {
    return (
        <View>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false} className="">
                <View className="p-2">
                    <View>
                        <KYCCard
                            onPress={() => console.log("Go to KYC screen")}
                        />
                    </View>
                    <View className="flex-row mb-4 mt-6 items-center">
                        <StatCard
                            title="Total Orders"
                            value={0}
                            icon="cart"
                            colors={{ bg: "#1c5894", icon: "#fff" }}
                        />
                        <StatCard
                            title="Cancelled Orders"
                            value={0}
                            icon="cancel"
                            colors={{ bg: "#1c5894", icon: "#fff" }}
                        />
                    </View>

                    <View className="flex-row mb-4">
                        <StatCard
                            title="Confirmed Orders"
                            value={0}
                            icon="confirm"
                            colors={{ bg: "#1c5894", icon: "#fff" }}
                        />
                        <StatCard
                            title="Pending Orders"
                            value={0}
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
