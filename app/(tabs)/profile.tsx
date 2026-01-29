import Header from "@/src/components/shared/Header";
import { AccountHeader } from "@/src/components/User/AccountHeader";
import { AccountItem } from "@/src/components/User/AccountItem";
import { AccountSection } from "@/src/components/User/AccountSection";
import { deleteUser } from "@/src/services/user";
import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
import { logout } from "@/src/utils/logout";
import { getToken } from "@/src/utils/storage";
import { router } from "expo-router";
import { Contact, Delete, LogOut, User, Wallet } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Linking, ScrollView, View } from "react-native";

export default function ProfileScreen() {
    // const [user, setUser] = useState<IUserDetail | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const user = useUserStore((s) => s.user);
    // useEffect(() => {
    //     const loadUser = async () => {
    //         const data = await AsyncStorage.getItem("userData");
    //         if (data) setUser(JSON.parse(data));
    //     };
    //     loadUser();
    // }, []);

    useEffect(() => {
        async function fetchToken() {
            const tok = await getToken();
            setToken(tok)
        }
        fetchToken();
    }, []);

    const openURL = async (url: string) => {
        // Check if the device supports the URL
        const supported = await Linking.canOpenURL(url);
        // router.push("/(pages)/kyc");
        if (supported) {
            await Linking.openURL(`${url}?token=${token}`);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    };

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

    const confirmDelete = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: handleDelete,
                },
            ]
        );
    };

    const handleDelete = async () => {
        try {
            await deleteUser();
            useAuthStore.getState().logout();
            logout();
        } catch (error) {
            Alert.alert("Error", "Failed to delete account. Please try again.");
        }
    };

    const handleContactUs = () => {
        try {
            router.replace('/(pages)/contact')

        } catch (error) {

        }
    }

    return (
        <View className="flex-1 bg-gray-100">
            <Header />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
            >
                <AccountHeader
                    name={user?.fullName}
                    userId={user?.username}
                    email={user?.email}
                />

                <AccountSection title="Account">
                    <AccountItem
                        label="Funds"
                        icon={<Wallet size={18} color="#4B5563" />}
                        onPress={() => router.replace("/(pages)/wallet")}
                    />
                    {/* <AccountItem
                        label="Policies"
                        icon={<File size={18} color="#4B5563" />}
                    /> */}
                    <AccountItem
                        label={user?.kycstatus ? `KYC is done` : `Kyc is Pending`}
                        icon={user?.kycstatus ? <User size={18} color="#4B5563" /> : <User size={18} color="#eb4034" />}
                        onPress={() => openURL(`https://digitalwealth.in/AppAccess/KYCPage`)}
                    />
                    <AccountItem
                        label="Delete Account"
                        icon={<Delete size={18} color="#4B5563" />}
                        onPress={confirmDelete}
                    />
                    <AccountItem
                        label="Contact Us"
                        icon={<Contact size={18} color="#4B5563" />}
                        onPress={handleContactUs}
                    />
                    <AccountItem
                        label="Log Out"
                        icon={<LogOut size={18} color="#eb4034" />}
                        onPress={handleLogout}
                    />
                    {/* <AccountItem label="Connected Websites" /> */}
                </AccountSection>
            </ScrollView>
        </View>
    );
}
