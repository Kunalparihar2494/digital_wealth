// src/components/BottomTabs.tsx
import { router, usePathname } from "expo-router";
import { Book, BriefcaseBusinessIcon, Home, User } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabs = [
    { label: 'Home', name: "home", icon: Home, route: "/home" },
    { label: 'Orders', name: "orders", icon: Book, route: "/orders" },
    // { name: "add", icon: Plus, route: "add" },
    { label: 'Holdings', name: "portfolio", icon: BriefcaseBusinessIcon, route: "/portfolio" },
    { label: 'Profile', name: "profile", icon: User, route: "/profile" },
] as const;

export default function BottomTabs() {
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    return (
        <View
            style={{ paddingBottom: insets.bottom }}
            className="bg-white border-t border-gray-200 flex-row"
        >
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive =
                    pathname === tab.route ||
                    pathname.startsWith(tab.route + "/");

                return (
                    <TouchableOpacity
                        key={tab.route}
                        onPress={() => router.replace(tab.route)}
                        activeOpacity={0.7}
                        className="flex-1 items-center justify-center py-3"
                    >
                        <Icon
                            size={22}
                            color={isActive ? "#0F172A" : "#9CA3AF"}
                        />
                        <Text
                            className={`text-xs mt-1 ${isActive ? "text-gray-900 font-medium" : "text-gray-400"
                                }`}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}