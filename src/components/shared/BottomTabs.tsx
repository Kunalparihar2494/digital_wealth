// src/components/BottomTabs.tsx
import { router, usePathname } from "expo-router";
import { BarChart3, Home, Plus, TrendingUp, User, } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabs = [
    { name: "home", icon: Home, route: "/(tabs)/home" },
    { name: "trending", icon: TrendingUp, route: "/(tabs)/shares" },
    { name: "add", icon: Plus, route: "add" }, // center button
    { name: "stats", icon: BarChart3, route: "/(tabs)/more" },
    { name: "profile", icon: User, route: "/(tabs)/chat" },
] as const;

export default function BottomTabs() {
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    return (
        // <SafeAreaWrapper>
        //     <Tabs
        //         screenOptions={{
        //             headerShown: false,
        //             tabBarActiveTintColor: "#2563eb",
        //             tabBarInactiveTintColor: "#9ca3af",
        //             tabBarStyle: {
        //                 backgroundColor: "#ffffff",
        //                 borderTopLeftRadius: 20,
        //                 borderTopRightRadius: 20,
        //                 height: 70,
        //                 paddingBottom: 8,
        //             },
        //             tabBarLabelStyle: {
        //                 fontSize: 12,
        //                 fontWeight: "600",
        //             },
        //         }}
        //     >
        //         <Tabs.Screen
        //             name="home"
        //             options={{
        //                 title: "Home",
        //                 tabBarIcon: ({ color, focused }) => (
        //                     <Home color={focused ? "#2563eb" : color} size={22} />
        //                 ),
        //             }}
        //         />
        //         <Tabs.Screen
        //             name="shares"
        //             options={{
        //                 title: "Shares",
        //                 tabBarIcon: ({ color, focused }) => (
        //                     <LineChart color={focused ? "#2563eb" : color} size={22} />
        //                 ),
        //             }}
        //         />
        //         <Tabs.Screen
        //             name="chat"
        //             options={{
        //                 title: "Chat",
        //                 tabBarIcon: ({ color, focused }) => (
        //                     <MessageCircle color={focused ? "#2563eb" : color} size={22} />
        //                 ),
        //             }}
        //         />
        //         <Tabs.Screen
        //             name="more"
        //             options={{
        //                 title: "More",
        //                 tabBarIcon: ({ color, focused }) => (
        //                     <User color={focused ? "#2563eb" : color} size={22} />
        //                 ),
        //             }}
        //         />
        //     </Tabs>
        // </SafeAreaWrapper>

        <View
            style={{
                position: "absolute",
                left: 16,
                right: 16,
                bottom: 10 + insets.bottom, // ✅ FIX
            }} className="absolute bottom-4 left-4 right-4 bg-white rounded-3xl shadow-lg flex-row items-center justify-between px-6 py-3">

            {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = pathname === tab.route;

                // CENTER FAB
                if (tab.name === "add") {
                    return (
                        <TouchableOpacity
                            key={tab.name}
                            // onPress={() => router.push("/(tabs)/create")}
                            className="bg-secondary w-14 h-14 rounded-full items-center justify-center -mt-10 shadow-xl"
                        >
                            <Icon color="white" size={26} />
                        </TouchableOpacity>
                    );
                }

                return (
                    <TouchableOpacity
                        key={tab.name}
                        onPress={() => router.push(tab.route)}
                        className="items-center flex-1"
                        activeOpacity={0.7}
                    >
                        <Icon
                            size={22}
                            color={isActive ? "#0F172A" : "#9CA3AF"}
                        />

                        {/* ACTIVE DOT */}
                        {isActive && (
                            <View className="w-1.5 h-1.5 bg-[#0F172A] rounded-full mt-1" />
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
