import { useUserStore } from "@/src/store/user.store";
import { Text, View } from "react-native";

export default function ProfileHeaderCard() {
    const user = useUserStore((s) => s.user);

    return (
        <View className="bg-white mx-4 mt-6 rounded-2xl p-4 shadow-sm flex-row items-center justify-between">
            <View>
                <Text className="text-lg font-semibold text-gray-900">
                    {user?.fullName ?? "User"}
                </Text>
                <Text className="text-sm text-gray-500">
                    {user?.email ?? "user@email.com"}
                </Text>
                <Text className="mt-1 text-xs text-gray-400">
                    {user?.id ?? "PH7404"}
                </Text>
            </View>

            <View className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                {/* <Image
                    source={
                        user?.avatar
                            ? { uri: user.avatar }
                            : require("@/assets/images/avatar-placeholder.png")
                    }
                    className="w-full h-full"
                /> */}
            </View>
        </View>
    );
}
