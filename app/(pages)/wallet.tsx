import Header from "@/src/components/shared/Header";
import { FundsActionButton } from "@/src/components/Wallet/FundsActionButton";
import { MarginCard } from "@/src/components/Wallet/MarginCard";
import { TransactionHeader } from "@/src/components/Wallet/TransactionHeader";
import { useWalletStore } from "@/src/store/wallet.store";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";

export default function Wallet() {

    const { data, loading, fetchBalance } = useWalletStore();


    useEffect(() => {
        console.log("wallet data ->", data);

        if (!data && !loading) {
            fetchBalance();
        }
    }, [data, loading, fetchBalance]);

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
            <ScrollView
                className="px-4 mt-4"
                showsVerticalScrollIndicator={false}
            >
                <View className="">
                    <View className="mt-2">
                        <MarginCard amount={data && data?.balance} />
                    </View>


                    {/* ACTION BUTTONS */}
                    <View className="flex-row gap-4 mb-6">
                        <FundsActionButton onPress={() => router.replace("/(pages)/addFunds")} label="Add funds" color="#22C55E" />
                        <FundsActionButton label="Withdraw" color="#3B82F6" />
                    </View>
                </View>


                {/* <FundsSummary
                    available={funds.availableCash}
                    used={funds.usedMargin}
                /> */}

                {/* <View className="mt-4">
                    {funds.breakdown.map((item, index) => (
                        <FundsRowItem
                            key={index}
                            label={item.label}
                            value={item.value}
                        />
                    ))}
                </View> */}

                <TransactionHeader onSeeAll={() => console.log("See all")} />

                {/* <TransactionItem
                    title="Amount Debited"
                    date="October 17, 09:00 PM"
                    amount="-₹44.80"
                />

                <TransactionItem
                    title="Amount Credited"
                    date="October 15, 10:00 AM"
                    amount="+₹1,250"
                    isCredit
                /> */}

            </ScrollView>
        </View>

    );
}
