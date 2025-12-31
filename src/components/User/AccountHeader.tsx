import { Text, View } from "react-native";

type Props = {
    name: string;
    userId: string;
    email: string;
    avatar?: string;
};

export function AccountHeader({ name, userId, email, avatar }: Props) {
    return (
        <View className="bg-white rounded-2xl px-4 py-4 mb-6 shadow-sm flex-row items-center justify-between">
            <View>
                <Text className="text-lg font-semibold text-gray-900">{name}</Text>
                <Text className="text-sm text-gray-500">{email}</Text>
            </View>

            <View className="w-14 h-14 rounded-full overflow-hidden items-center justify-center mr-3 border-black border-2 bg-gray-200">
                <Text className="text-indigo-600 font-bold text-lg">
                    {name?.charAt(0) ?? "U"}
                </Text>
                {/* <Image
                    source={
                        avatar
                            ? { uri: avatar }
                            : require("@/assets/images/avatar-placeholder.png")
                    }
                    className="w-full h-full"
                    resizeMode="cover"
                /> */}
            </View>
        </View>
    );
}
