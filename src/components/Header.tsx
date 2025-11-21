import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Bell, LogOut } from "lucide-react-native";
import { router } from "expo-router";
import { getUser, clearUserData } from "../utils/storage";

import { IUserDetail } from "../model/auth.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
    const [username, setUsername] = useState<IUserDetail | undefined>(undefined);

    useEffect(() => {
        const loadUser = async () => {
            const userData = await AsyncStorage.getItem("userData");
            if (userData) {
                const user: IUserDetail = JSON.parse(userData);
                setUsername(user);
            }
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
                    await clearUserData();
                    router.replace("/(auth)/login");
                },
            },
        ]);
    };

    return (
        <View className="w-full flex-row items-center justify-between bg-primary px-4 py-3 rounded-b-3xl shadow-md">
            <View>
                <Text className="text-white text-lg font-semibold">
                    Hello, {username?.fullName}
                </Text>
                <Text className="text-white text-xs">Welcome back 👋</Text>
            </View>

            <View className="flex-row items-center justify-end" style={{ marginLeft: "auto" }}>
                <TouchableOpacity
                    onPress={() => Alert.alert("Notifications", "No new notifications")}
                    className="bg-blue-500 p-2 rounded-full mr-4"
                >
                    <Bell color="white" size={20} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogout} className=" p-2 rounded-full">
                    <LogOut color="white" size={20} />
                </TouchableOpacity>
            </View>

        </View>


    );
}
