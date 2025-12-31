// src/components/Dashboard/HomeComponent.tsx
import { groupBySector } from "@/src/utils/sectorUtil";
import { ScrollView, View } from "react-native";
import SectorSection from "../shared/SectorSection";
import HomeSearchSection from "./HomeSearchSection";
import ProfitLossCard from "./ProfitLossCard";

export function HomeComponent({ data }: { data: any }) {
    const shares = data?.shares ?? [];
    const sectorMap = groupBySector(shares);


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
            <HomeSearchSection shares={shares} />


            <View className="px-2 pt-4">
                <SectorSection
                    title="Manufacturing"
                    data={sectorMap.manufacturing}
                />

                <SectorSection
                    title="Finance"
                    data={sectorMap.finance}
                />

                <SectorSection
                    title="Technology"
                    data={sectorMap.technology}
                />
            </View>
        </ScrollView>
    );
}
