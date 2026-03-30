


import HoldingsList from "@/src/components/DashboardComponent/HoldingList";
import ProfitLossCard from "@/src/components/DashboardComponent/ProfitLossCard";
import SectionTitle from "@/src/components/SectionTitle";
import Header from "@/src/components/shared/Header";
import { useHoldingState } from "@/src/store/shares.store";
import { getProfitLossSummary } from "@/src/utils/portfolio.util";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

const TABS = ["Holdings"];

export default function Portfolio() {
    const [activeTab, setActiveTab] = useState("Holdings");
    const { holdingData, holdingLoading, fetchHoldings } = useHoldingState();
    const summary = getProfitLossSummary(holdingData ?? []);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!holdingLoading) fetchHoldings();
    }, [])

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await fetchHoldings();
        } catch (error) {
            console.log("Refresh error:", error);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <View className="flex-1 bg-gray-100">
            <Header />
            {/* <TabMenu
                tabs={TABS}
                activeTab={activeTab}
                onChange={setActiveTab}
            /> */}
            <ScrollView
                className="px-4 pt-4 mt-2"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor="#10b981"
                        title="Refreshing..."
                    />
                }
            >
                <ProfitLossCard
                    pnl={summary.pnl}
                    portfolioValue={summary.portfolioValue}
                    percentage={summary.percentage}
                    gains={summary.gains}
                    isProfit={summary.isProfit}
                />

                <SectionTitle title={"Your Holdings"} />
                <HoldingsList
                    data={holdingData}
                />
            </ScrollView>
        </View>
    );
}
