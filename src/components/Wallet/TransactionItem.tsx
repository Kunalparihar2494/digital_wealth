import { Text, View } from "react-native";

type Props = {
    title: string;
    date: string;
    amount: string;
    isCredit?: boolean;
    logo?: any;
};

export function TransactionItem({
    title,
    date,
    amount,
    isCredit,
    logo,
}: Props) {
    return (
        <View className="flex-row items-center justify-between px-3 py-3 border-b border-gray-200">
            <View className="flex-row items-center">
                {/* <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center mr-3">
                    {logo && (
                        <Image
                            source={logo}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    )}
                </View> */}

                <View>
                    <Text className="font-medium text-gray-800">
                        {title}
                    </Text>
                    <Text className="text-xs text-gray-500">
                        {date}
                    </Text>
                </View>
            </View>

            <Text
                className={`font-semibold ${isCredit ? "text-emerald-600" : "text-red-600"
                    }`}
            >
                {amount}
            </Text>
        </View>
    );
}
