// src/components/Dashboard/HomeComponent.tsx
import { useState } from "react";
import { ScrollView, View } from "react-native";
import HoldingsList from "./HoldingList";

import { OrdersTable } from "./OrdersTable";
import ProfitLossCard from "./ProfitLossCard";
import SectionHeaderDashBoard from "./SectionHeaderDashboard";
import { StatCard } from "./StatCard";

export function HomeComponent() {
    const [expanded, setExpanded] = useState(false);

    const recentOrder = [
        {
            "id": 40,
            "shareId": 6,
            "shareName": "API Holdings Limited (Pharmeasy)",
            "totalPrice": 79000.00,
            "status": "Created",
            "createdAt": "2025-12-12T14:11:52.1989936+00:00",
            "quantity": 10000
        }
    ]

    const holdingsData = [
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
        {
            name: "Paytm",
            qty: 15,
            price: "₹850",
            pnl: "+₹2450",
            percent: "+3.1%",
        },
    ];
    return (
        <ScrollView
            className="px-4 pt-4"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
        >
            <ProfitLossCard
                pnl="+₹4,410"
                portfolioValue="₹56,560"
                percentage="12.4%"
                gains="₹72,400"
            />

            <SectionHeaderDashBoard title="Your Holdings"
                expanded={expanded}
                onToggle={() => setExpanded(!expanded)} />
            <HoldingsList
                data={holdingsData}
                visibleCount={expanded ? holdingsData.length : 2}
            />

            {/* <SectionHeaderDashBoard title="Portfolio" />
            <View className="flex-row mb-5">
                <PortfolioCard title="Tech Stocks" amount="92500" />
                <PortfolioCard title="Govt Bonds" amount="58000" />
            </View>

            <SectionHeaderDashBoard title="Trending Stocks" />
            <View className="flex-row">
                <TrendingStockCard name="Adani Ports" percent="+5.2%" />
                <TrendingStockCard name="Infosys" percent="-1.8%" isLoss />
            </View> */}

            <View className="flex-row gap-3 mb-4 mt-4">
                <StatCard title="Total Orders" value={8} bg="#EFF6FF" color="#2563EB" />
                <StatCard title="Pending" value={5} bg="#FEF3C7" color="#D97706" />
            </View>

            <View className="flex-row gap-3 mb-4">
                <StatCard title="Confirmed" value={7} bg="#ECFDF5" color="#059669" />
                <StatCard title="Cancelled" value={2} bg="#FEE2E2" color="#DC2626" />
            </View>

            <OrdersTable data={recentOrder} />
        </ScrollView>
    );
}
