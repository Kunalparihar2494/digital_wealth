import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { ChevronLeft, Wallet } from "lucide-react-native";
import React, { useEffect, useState } from "react";

import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // ✅ ADD

interface HeaderProps {
    showBackButton?: boolean;
    showWallet?: boolean;
    onPress?: () => void;
}


export default function Header({ showBackButton = false, onPress, showWallet = true }: HeaderProps) {
    const insets = useSafeAreaInsets(); // ✅ ADD
    const user = useUserStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const loadUser = useUserStore((s) => s.loadUser);
    const [isKycPending, setIsKycPending] = useState(false);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    useEffect(() => {
        checkKycStatus();
    }, []);

    const checkKycStatus = async () => {
        try {
            const status = await AsyncStorage.getItem("kycStatus");

            const parsedStatus = status
                ? JSON.parse(status)
                : null;

            // console.log("KYC STATUS:", parsedStatus);

            // Pending if null / undefined / empty
            if (
                parsedStatus === null ||
                parsedStatus === undefined ||
                parsedStatus === "" ||
                parsedStatus === "Pending"
            ) {
                setIsKycPending(true);
            } else {
                setIsKycPending(false);
            }
        } catch (error) {
            console.log("KYC ERROR:", error);
        }
    };

    return (
        <View
            style={{ paddingTop: insets.top + 15 }} // 🔥 KEY FIX
            className="bg-gray-200 px-4 pb-3"
        >
            <View className="bg-gray-200 px-2 pb-2 flex-row items-center justify-between">
                {/* LEFT */}
                <View className="flex-row items-center">
                    {showBackButton && <TouchableOpacity className="p-2" onPress={() => router.replace("/(tabs)/home")}>
                        <ChevronLeft size={20} color="#374151" />
                    </TouchableOpacity>}
                    <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3 border-black border-2">
                        <TouchableOpacity
                            onPress={() => router.replace("/(tabs)/profile")}><Text className="text-indigo-600 font-bold text-lg">
                                {user?.fullName?.charAt(0) ?? "U"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text className="text-gray-500 text-xs">Welcome back</Text>
                        <Text className="text-gray-900 font-semibold text-base">
                            {user?.fullName ?? "User"}
                        </Text>
                    </View>
                </View>

                {/* RIGHT */}
                <View className="flex-row items-center">
                    {/* <TouchableOpacity className="p-2 mr-2">
                        <Search size={20} color="#374151" />
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity className="p-2 mr-2 relative">
                        <Bell size={20} color="#374151" />
                        <View className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                    </TouchableOpacity> */}
                    {isKycPending && (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => router.replace("/(tabs)/profile")}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: "#FFF3CD",
                                paddingHorizontal: 14,
                                paddingVertical: 8,
                                borderRadius: 18,
                                marginRight: 5
                            }}
                        >
                            {/* <Wallet size={18} color="#FFFFFF" /> */}

                            <Text
                                style={{
                                    color: "#856404",
                                    fontWeight: "600",
                                    marginLeft: 8,
                                    fontSize: 12,
                                }}
                            >
                                KYC is Pending
                            </Text>
                        </TouchableOpacity>
                    )}
                    {showWallet && (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => router.replace("/(pages)/wallet")}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: "#2563EB",
                                paddingHorizontal: 14,
                                paddingVertical: 8,
                                borderRadius: 18,
                            }}
                        >
                            <Wallet size={18} color="#FFFFFF" />

                            {/* <Text
                                style={{
                                    color: "#FFFFFF",
                                    fontWeight: "600",
                                    marginLeft: 8,
                                    fontSize: 14,
                                }}
                            >
                                Wallet
                            </Text> */}
                        </TouchableOpacity>
                    )}
                    {/* <TouchableOpacity className="p-2" onPress={handleLogout}>
                        <LogOut size={20} color="#374151" />
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    );
}
