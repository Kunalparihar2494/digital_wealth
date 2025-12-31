import Header from "@/src/components/shared/Header";
import { AccountHeader } from "@/src/components/User/AccountHeader";
import { AccountItem } from "@/src/components/User/AccountItem";
import { AccountSection } from "@/src/components/User/AccountSection";
import { IUserDetail } from "@/src/model/auth.interface";
import { useAuthStore } from "@/src/store/auth.store";
import { logout } from "@/src/utils/logout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { File, LogOut, Settings, User, Wallet } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

export default function ProfileScreen() {
    const [user, setUser] = useState<IUserDetail | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const data = await AsyncStorage.getItem("userData");
            if (data) setUser(JSON.parse(data));
        };
        loadUser();
    }, []);

    const handleLogout = async () => {
        Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: async () => {
                    useAuthStore.getState().logout();
                    logout();
                },
            },
        ]);
    };

    return (
        <View className="flex-1 bg-gray-100">
            <Header />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
            >
                <AccountHeader
                    name="Kunal Parihar"
                    userId="8827651418"
                    email="kunal@test.com"
                />

                <AccountSection title="Account">
                    <AccountItem
                        label="Funds"
                        icon={<Wallet size={18} color="#4B5563" />}
                        onPress={() => console.log("Funds")}
                    />
                    <AccountItem
                        label="Policies"
                        icon={<File size={18} color="#4B5563" />}
                    />
                    <AccountItem
                        label="Profile"
                        icon={<User size={18} color="#4B5563" />}
                    />
                    <AccountItem
                        label="Settings"
                        icon={<Settings size={18} color="#4B5563" />}
                    />
                    <AccountItem
                        label="Log Out"
                        icon={<LogOut size={18} color="#eb4034" />}
                        onPress={handleLogout}
                    />
                    <AccountItem label="Connected Websites" />
                </AccountSection>
            </ScrollView>
        </View>
    );
}
