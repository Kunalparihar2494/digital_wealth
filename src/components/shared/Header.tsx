import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
import { router } from "expo-router";
import { Bell, LogOut, Search } from "lucide-react-native";
import { useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // ✅ ADD


export default function Header() {
    const insets = useSafeAreaInsets(); // ✅ ADD
    const user = useUserStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    useEffect(() => {
        useUserStore.getState().loadUser();
    }, []);

    const handleLogout = async () => {
        Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: async () => {
                    useAuthStore.getState().logout();
                    router.replace("/(auth)/login");
                },
            },
        ]);
    };

    return (
        <View
            style={{ paddingTop: insets.top + 15 }} // 🔥 KEY FIX
            className="bg-gray-200 px-4 pb-3"
        >
            <View className="bg-gray-200 px-2 pb-2 rounded-b-3xl flex-row items-center justify-between">
                {/* LEFT */}
                <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3">
                        <Text className="text-indigo-600 font-bold text-lg">
                            {user?.fullName?.charAt(0) ?? "U"}
                        </Text>
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
                    <TouchableOpacity className="p-2 mr-2">
                        <Search size={20} color="#374151" />
                    </TouchableOpacity>

                    <TouchableOpacity className="p-2 mr-2 relative">
                        <Bell size={20} color="#374151" />
                        <View className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                    </TouchableOpacity>

                    <TouchableOpacity className="p-2" onPress={handleLogout}>
                        <LogOut size={20} color="#374151" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
