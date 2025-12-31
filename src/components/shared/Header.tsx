import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
import { router } from "expo-router";
import { Bell, ChevronLeft, Wallet } from "lucide-react-native";
import { useEffect } from "react";
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

    useEffect(() => {
        useUserStore.getState().loadUser();
    }, []);

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
                    {/* <TouchableOpacity className="p-2 mr-2">
                        <Search size={20} color="#374151" />
                    </TouchableOpacity> */}

                    <TouchableOpacity className="p-2 mr-2 relative">
                        <Bell size={20} color="#374151" />
                        <View className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                    </TouchableOpacity>
                    {showWallet && <TouchableOpacity className="p-2" onPress={() => router.replace("/(pages)/wallet")}>
                        <Wallet size={20} color="#374151" />
                    </TouchableOpacity>}
                    {/* <TouchableOpacity className="p-2" onPress={handleLogout}>
                        <LogOut size={20} color="#374151" />
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    );
}
