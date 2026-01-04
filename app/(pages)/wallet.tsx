import Header from "@/src/components/shared/Header";
import { FundsActionButton } from "@/src/components/Wallet/FundsActionButton";
import { MarginCard } from "@/src/components/Wallet/MarginCard";
import { TransactionHeader } from "@/src/components/Wallet/TransactionHeader";
import { TransactionItem } from "@/src/components/Wallet/TransactionItem";
import { usePaymentStatusCheck, useTransactionStore, useWalletStore } from "@/src/store/wallet.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { Alert, FlatList, Text, View } from "react-native";

export default function Wallet() {
    const { data, fetchBalance } = useWalletStore();
    const { transactionData, fetchTransactions } = useTransactionStore();
    const { fetchPaymentStatus } = usePaymentStatusCheck();

    useFocusEffect(
        useCallback(() => {
            const checkPayment = async () => {
                const ref = await AsyncStorage.getItem("lastPaymentRef");
                if (!ref) return;

                try {
                    const res = (await fetchPaymentStatus(ref)) as unknown as {
                        status: "Success" | "Failed" | "Pending";
                    };

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


    const funds = {
        availableMargin: 0.9,
        availableCash: 0.9,
        usedMargin: 0,
        breakdown: [
            { label: "Opening balance", value: data?.balance },
            { label: "Payin", value: 0 },
            { label: "Payout", value: 0 },
            { label: "SPAN", value: 0 },
            { label: "Delivery margin", value: 0 },
            { label: "Exposure", value: 0 },
            { label: "Option premium", value: 0 },
            { label: "Collateral (Liquid funds)", value: 0 },
            { label: "Collateral (Equity)", value: 0 },
        ],
    };

    return (
        <View className="flex-1 bg-gray-100">
            <Header showBackButton={true} showWallet={false} />

            <FlatList
                data={transactionData?.transactions ?? []}
                keyExtractor={(item) => item.id.toString()}

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
