import Header from "@/src/components/shared/Header";
import { FundsActionButton } from "@/src/components/Wallet/FundsActionButton";
import { MarginCard } from "@/src/components/Wallet/MarginCard";
import { TransactionHeader } from "@/src/components/Wallet/TransactionHeader";
import { TransactionItem } from "@/src/components/Wallet/TransactionItem";
import { usePaymentStatusCheck, useTransactionStore, useWalletStore } from "@/src/store/wallet.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, Text, View } from "react-native";

export default function Wallet() {
    const { data, fetchBalance } = useWalletStore();
    const { transactionData, fetchTransactions } = useTransactionStore();
    const { fetchPaymentStatus } = usePaymentStatusCheck();
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await fetchBalance();
            await fetchTransactions();
        } catch (error) {
            console.log("Refresh error:", error);
        } finally {
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            const checkPayment = async () => {
                const ref = await AsyncStorage.getItem("lastPaymentRef");
                if (!ref) return;

                try {
                    const res = (await fetchPaymentStatus(ref)) as unknown as {
                        status: "Success" | "Failed" | "Pending";
                    };
                    // console.log('wallet page-', res)
                    if (res.status === "Success") {
                        Alert.alert("Success", "Funds added successfully");
                        await fetchBalance();
                    } else if (res.status === "Failed") {
                        Alert.alert("Failed", "Payment failed");
                    } else {
                        Alert.alert("Pending", "Payment is still processing");
                    }

                    await AsyncStorage.removeItem("lastPaymentRef");
                } catch {
                    Alert.alert("Error", "Unable to verify payment");
                }
            };

            checkPayment();
        }, [])
    );

    useEffect(() => {
        fetchBalance();
        fetchTransactions();
    }, []);


    return (
        <View className="flex-1 bg-gray-100">
            <Header showBackButton={true} showWallet={false} />

            <FlatList
                data={transactionData?.transactions ?? []}
                keyExtractor={(item) => item.id.toString()}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor="#10b981"
                        title="Refreshing..."
                    />
                }

                renderItem={({ item }) => (
                    <TransactionItem
                        title={item.type}
                        date={item.createdAt}
                        amount={item.amount}
                        statusColor={item.statusColor}
                    />
                )}

                ListHeaderComponent={
                    <View className="px-4 mt-4">
                        {/* BALANCE CARD */}
                        <View className="mt-2">
                            <MarginCard amount={data?.balance} />
                        </View>

                        {/* ACTION BUTTONS */}
                        <View className="flex-row gap-4 mb-6 mt-4">
                            <FundsActionButton
                                onPress={() => router.replace("/(pages)/addFunds")}
                                label="Add funds"
                                color="#22C55E"
                            />
                            <FundsActionButton
                                label="Withdraw"
                                color="#3B82F6"
                                onPress={() => router.replace("/(pages)/addFunds")}
                            />
                        </View>

                        {/* TRANSACTION HEADER */}
                        <TransactionHeader onSeeAll={() => console.log("See all")} />
                    </View>
                }

                ListEmptyComponent={
                    <View className="items-center justify-center py-20">
                        <Text className="text-gray-500 text-lg font-medium">
                            No transaction detail found
                        </Text>
                    </View>
                }

                ItemSeparatorComponent={() => (
                    <View className="h-0.5 bg-gray-100 mx-4" />
                )}

                contentContainerStyle={{
                    paddingBottom: 40,
                }}

                showsVerticalScrollIndicator={false}
            />
        </View>

    );
}
