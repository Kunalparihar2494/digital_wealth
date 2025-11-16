// src/components/BottomTabs.tsx
import React from "react";
import { Tabs } from "expo-router";
import { Home, MessageCircle, LineChart } from "lucide-react-native";
import SafeAreaWrapper from "./SafeAreaWrapper";

export default function BottomTabs() {
    return (
        <SafeAreaWrapper>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#2563eb",
                    tabBarInactiveTintColor: "#9ca3af",
                    tabBarStyle: {
                        backgroundColor: "#ffffff",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        height: 70,
                        paddingBottom: 8,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "600",
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, focused }) => (
                            <Home color={focused ? "#2563eb" : color} size={22} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="chat"
                    options={{
                        title: "Chat",
                        tabBarIcon: ({ color, focused }) => (
                            <MessageCircle color={focused ? "#2563eb" : color} size={22} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="shares"
                    options={{
                        title: "Shares",
                        tabBarIcon: ({ color, focused }) => (
                            <LineChart color={focused ? "#2563eb" : color} size={22} />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaWrapper>
    );
}
