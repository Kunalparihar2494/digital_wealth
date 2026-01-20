


import HoldingsList from "@/src/components/DashboardComponent/HoldingList";
import ProfitLossCard from "@/src/components/DashboardComponent/ProfitLossCard";
import SectionTitle from "@/src/components/SectionTitle";
import Header from "@/src/components/shared/Header";
import { useHoldingState } from "@/src/store/shares.store";
import { getProfitLossSummary } from "@/src/utils/portfolio.util";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const TABS = ["Holdings"];

export default function Portfolio() {
    const [activeTab, setActiveTab] = useState("Holdings");
    const { holdingData, holdingLoading, fetchHoldings } = useHoldingState();
    const summary = getProfitLossSummary(holdingData ?? []);

    useEffect(() => {
        if (!holdingLoading) fetchHoldings();
    }, [])

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
                {/* <HoldingsList
                    data={[
                        {
                            name: "Reliance",
                            qty: 10,
                            price: "₹2500",
                            pnl: "+₹2300",
                            percent: "+2.3%",
                        },
                        {
                            name: "TCS",
                            qty: 5,
                            price: "₹3200",
                            pnl: "-₹1120",
                            percent: "-1.2%",
                            isLoss: true,
                        },
                    ]}
                /> */}
            </ScrollView>
        </View>
    );
}
