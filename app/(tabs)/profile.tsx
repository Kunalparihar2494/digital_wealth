import Header from "@/src/components/shared/Header";
import { AccountHeader } from "@/src/components/User/AccountHeader";
import { AccountItem } from "@/src/components/User/AccountItem";
import { AccountSection } from "@/src/components/User/AccountSection";
import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
import { logout } from "@/src/utils/logout";
import { File, LogOut, Settings, User, Wallet } from "lucide-react-native";
import React from "react";
import { Alert, ScrollView, View } from "react-native";

export default function ProfileScreen() {
    // const [user, setUser] = useState<IUserDetail | null>(null);
    const user = useUserStore((s) => s.user);
    // useEffect(() => {
    //     const loadUser = async () => {
    //         const data = await AsyncStorage.getItem("userData");
    //         if (data) setUser(JSON.parse(data));
    //     };
    //     loadUser();
    // }, []);

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
                    name={user?.fullName}
                    userId={user?.username}
                    email={user?.email}
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
