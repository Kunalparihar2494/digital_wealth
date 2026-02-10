// src/components/Dashboard/HomeComponent.tsx
import { useHoldingState } from "@/src/store/shares.store";
import { getProfitLossSummary } from "@/src/utils/portfolio.util";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import ShareGridCard from "../shared/ShareLongCard";
import HomeSearchSection from "./HomeSearchSection";

export function HomeComponent({ data }: { data: any }) {
    const shares = data?.Shares ?? [];

    const [search, setSearch] = useState("");

    const { holdingData, holdingLoading, fetchHoldings } = useHoldingState();
    const summary = getProfitLossSummary(holdingData ?? []);

    useEffect(() => {
        if (!holdingLoading) fetchHoldings();
    }, []);

    // 🔹 FILTER LOGIC
    const filteredShares = useMemo(() => {
        if (!search.trim()) return shares;

        const text = search.toLowerCase();

        return shares.filter((item: any) =>
            item.company?.toLowerCase().includes(text) ||
            item.brandName?.toLowerCase().includes(text) ||
            item.sector?.toLowerCase().includes(text)
        );
    }, [search, shares]);

    return (
        <ScrollView
            className="px-4 pt-4"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
        >
            {/* <ProfitLossCard
                pnl={summary.pnl}
                portfolioValue={summary.portfolioValue}
                percentage={summary.percentage}
                gains={summary.gains}
                isProfit={summary.isProfit}
            /> */}
            {/* <HomeSearchSection shares={shares} /> */}

            <HomeSearchSection
                value={search}
                onChangeText={setSearch}
            />

            <View className="">
                <FlatList
                    data={filteredShares}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    scrollEnabled={false} // 🔥 important since inside ScrollView
                    columnWrapperStyle={{
                        gap: 12,
                    }}
                    contentContainerStyle={{
                        paddingTop: 16,
                    }}
                    renderItem={({ item }) => (
                        <ShareGridCard
                            logo={`https://digitalwealth.in/upload/${item.logo}`}
                            price={item.price}
                            name={item.company}
                            min={item.yearLow}
                            max={item.yearHigh}
                            minQuantity={item.minQuantity}
                            onPress={() =>
                                router.push({
                                    pathname: "/(pages)/shareDetail",
                                    params: { id: item?.id },
                                })
                            }
                        />
                    )}
                    ListEmptyComponent={
                        <Text className="text-center text-gray-500 mt-10">
                            No shares found
                        </Text>
                    }
                />
                {/* <SectorSection
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
                /> */}
            </View>
        </ScrollView>
    );
}
