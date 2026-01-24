import Header from "@/src/components/shared/Header";
import { ITopUpData } from "@/src/model/wallet.interface";
import { useWalletStore, useWalletTopUpStatus } from "@/src/store/wallet.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
    Alert,
    Linking,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const PAYMENT_URL = "https://digitalwealth.in/Auth/Home";

export default function AddFund() {
    const { fetchTopUpStatus } = useWalletTopUpStatus();
    const { data } = useWalletStore();
    const [amount, setAmount] = useState("");

    const handleAddFunds = async () => {
        if (!amount || Number(amount) <= 0) {
            Alert.alert("Invalid Amount", "Please enter a valid amount");
            return;
        }

        const userData = await AsyncStorage.getItem("userData");
        const { email } = userData ? JSON.parse(userData) : { email: "" };

        const payload: ITopUpData = { amount, email };

        try {
            const res = (await fetchTopUpStatus(payload)) as unknown as {
                success: boolean;
                gatewayPayload?: string;
                custRefNum?: string;
                message?: string;
            };

            if (res.success && res.gatewayPayload && res.custRefNum) {
                // ✅ Save reference for later verification
                await AsyncStorage.setItem("lastPaymentRef", res.custRefNum);

                // ✅ Open Easebuzz payment page
                Linking.openURL(res.gatewayPayload);
            }
            else if (!res.success && res.message) {
                Alert.alert("Error", res?.message);
            }
            else {
                Alert.alert("Error", "Unable to initiate payment ");
            }
        } catch {
            Alert.alert("Error", "Payment initiation failed");
        }
    };

    const handleWithdrawFund = async () => {
        try {
            const numAmount = parseInt(amount, 10)
            const numData = data?.balance ?? 0;
            if (numAmount > numData) Alert.alert("Error", "Payment is more than margin"); return

        } catch (error) {
            Alert.alert("Error", "Payment initiation failed");
        }
    }

    return (
        <View className="flex-1 bg-gray-100">
            <Header showBackButton={true} showWallet={false} />
            <ScrollView
                className="px-4 mt-4"
                showsVerticalScrollIndicator={false}
            >
                <View className="bg-white rounded-2xl p-5 shadow-sm">
                    <Text className="text-lg font-semibold text-gray-900 mb-1">
                        Add Funds
                    </Text>
                    <Text className="text-sm text-gray-500 mb-5">
                        Enter amount to add to your wallet
                    </Text>

                    {/* Amount Input */}
                    <View className="border border-gray-300 rounded-xl px-4 py-3 mb-4 bg-gray-50">
                        <Text className="text-xs text-gray-500 mb-1">Amount</Text>
                        <TextInput
                            placeholder="Enter amount"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                            className="text-lg font-semibold text-gray-900"
                        />
                    </View>

                    {/* Quick Amount Buttons */}
                    <View className="flex-row justify-between mb-6">
                        {[500, 1000, 5000].map((v) => (
                            <TouchableOpacity
                                key={v}
                                onPress={() => setAmount(String(v))}
                                className="border border-gray-300 rounded-lg px-4 py-2"
                            >
                                <Text className="text-gray-700 font-medium">₹{v}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Add Button */}
                    <View className="flex-1 gap-4 mb-6 mt-4">
                        <TouchableOpacity
                            onPress={handleAddFunds}
                            activeOpacity={0.85}
                            className="bg-emerald-600 py-4 rounded-xl"
                        >
                            <Text className="text-white text-center text-base font-semibold">
                                Add Funds
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleWithdrawFund}
                            activeOpacity={0.85}
                            className="bg-blue-600 py-4 rounded-xl"
                        >
                            <Text className="text-white text-center text-base font-semibold">
                                Withdraw Funds
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* INFO */}
                <Text className="text-xs text-gray-500 text-center mt-6">
                    Funds added will reflect instantly in your wallet.
                </Text>
            </ScrollView>
        </View>

    );
}
