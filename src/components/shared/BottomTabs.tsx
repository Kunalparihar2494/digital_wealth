// src/components/BottomTabs.tsx
import { LinearGradient } from "expo-linear-gradient";
import { router, usePathname } from "expo-router";
import { Book, BriefcaseBusinessIcon, Home, Plus, User } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabs = [
    { name: "home", icon: Home, route: "/home" },
    { name: "orders", icon: Book, route: "/orders" },
    { name: "add", icon: Plus, route: "add" },
    { name: "portfolio", icon: BriefcaseBusinessIcon, route: "/portfolio" },
    { name: "profile", icon: User, route: "/profile" },
] as const;

export default function BottomTabs() {
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    return (
        <View
            style={{
                position: "absolute",
                left: 16,
                right: 16,
                bottom: 10 + insets.bottom, // ✅ FIX
            }} className="absolute h-[4rem] bottom-4 left-4 right-4 bg-white rounded-3xl shadow-lg flex-row items-center justify-between px-6 py-3">

            {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = pathname === tab.route ||
                    pathname.startsWith(tab.route + "/")

                // CENTER FAB
                if (tab.name === "add") {
                    return (
                        <View key={tab.name} className="flex-1 items-center mb-5">
                            {/* GLOW SPRAY */}
                            <LinearGradient
                                colors={["rgba(16,185,129,0.45)", "rgba(16,185,129,0.05)"]}
                                style={{
                                    position: "absolute",
                                    width: 80,
                                    height: 80,
                                    borderRadius: 48,
                                    top: -53,
                                }}
                            />

                            {/* FAB BUTTON */}
                            <TouchableOpacity
                                className="bg-gray-800 w-20 h-20 rounded-full items-center justify-center -mt-14 shadow-2xl"
                                activeOpacity={0.85}
                            // onPress={() => router.push("/(tabs)/create")}
                            >
                                <Icon color="white" size={28} />
                            </TouchableOpacity>
                        </View>
                    );
                }

                return (
                    <View key={tab.name} className="flex-1 items-center justify-center">
                        <View
                            style={{
                                width: 44,
                                height: 44,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {/* HALO (ABSOLUTE, FIXED) */}
                            {isActive && (
                                <View
                                    pointerEvents="none"
                                    style={{
                                        position: "absolute",
                                        width: 44,
                                        height: 44,
                                        borderRadius: 22,
                                        backgroundColor: "rgba(15, 23, 42, 0.12)",
                                    }}
                                />
                            )}
                            <TouchableOpacity
                                key={tab.name}
                                onPress={() => router.push(tab.route)}
                                activeOpacity={0.7}
                                className=""
                            >
                                <Icon
                                    size={25}
                                    color={isActive ? "#0F172A" : "#9CA3AF"}
                                />

                                {/* ACTIVE DOT */}
                                {/* {isActive && (
                            <View className="w-1.5 h-1.5 bg-[#0f172a] rounded-full mt-1" />
                        )} */}
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}
