// src/components/Dashboard/HomeComponent.tsx
import { useShareStore } from "@/src/store/shares.store";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import ShareGridCard from "../shared/ShareLongCard";
import HomeSearchSection from "./HomeSearchSection";



export function HomeComponent({ data }: { data: any }) {
    // const [isKycPending, setIsKycPending] = useState(false);
    const shares = data?.Shares ?? [];
    const { fetchShares } = useShareStore();

    // useEffect(() => {
    //     checkKycStatus();
    // }, []);

    // const checkKycStatus = async () => {
    //     try {
    //         const status = await AsyncStorage.getItem("kycStatus");

    //         const parsedStatus = status
    //             ? JSON.parse(status)
    //             : null;

    //         console.log("KYC STATUS:", parsedStatus);

    //         // Pending if null / undefined / empty
    //         if (
    //             parsedStatus === null ||
    //             parsedStatus === undefined ||
    //             parsedStatus === "" ||
    //             parsedStatus === "Pending"
    //         ) {
    //             setIsKycPending(true);
    //         } else {
    //             setIsKycPending(false);
    //         }
    //     } catch (error) {
    //         console.log("KYC ERROR:", error);
    //     }
    // };


    const filterValue = useMemo(() => {
        const apiFilters = data?.Filters ?? [];

        const hasAll = apiFilters.some((f: any) => f.id === 0);

        return hasAll
            ? apiFilters
            : [{ id: 0, filterName: "All" }, ...apiFilters];
    }, [data]);

    const [search, setSearch] = useState("");
    const [selectedFilterId, setSelectedFilterId] = useState(0);

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

    const handleFilterChange = async (filterId: number) => {
        setSelectedFilterId(filterId);
        await fetchShares(filterId);
    };

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

            {/* {isKycPending && (
                <View style={styles.kycBanner}>
                    <Text style={styles.kycText}>
                        Your KYC is pending. Please complete KYC.
                    </Text>
                </View>
            )} */}

            <HomeSearchSection
                value={search}
                onChangeText={setSearch}
                selectedFilter={selectedFilterId}
                onFilterChange={handleFilterChange}
                filterValue={filterValue}
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


// const styles = StyleSheet.create({
//     kycBanner: {
//         backgroundColor: "#FFF3CD",
//         padding: 12,
//         margin: 10,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: "#FFE69C",
//     },
//     kycText: {
//         color: "#856404",
//         fontWeight: "600",
//         textAlign: "center",
//     },
// });