import { Text, View } from "react-native";

type Props = {
    name?: string;
    userId?: string;
    email?: string;
    avatar?: string;
};

export function AccountHeader({ name, userId, email }: Props) {
    return (
        <View className="bg-white rounded-2xl px-4 py-4 mb-6 shadow-sm flex-row items-center">

            {/* LEFT CONTENT */}
            <View className="flex-1 pr-3">
                <Text
                    className="text-lg font-semibold text-gray-900"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {name}
                </Text>

                <Text
                    className="text-sm text-gray-500"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {email}
                </Text>

                <Text
                    className="text-sm text-gray-400"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {userId}
                </Text>
            </View>

            {/* AVATAR */}
            <View className="w-14 h-14 rounded-full items-center justify-center border border-gray-300 bg-gray-200 flex-shrink-0">
                <Text className="text-indigo-600 font-bold text-lg">
                    {name?.charAt(0)?.toUpperCase() ?? "U"}
                </Text>
            </View>
        </View>
    );
}
