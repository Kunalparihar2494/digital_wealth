import { Text, View } from "react-native";

type Props = {
    title: string;
    date: string;
    amount: string | number;
    statusColor?: string;
    logo?: any;
};

export function TransactionItem({
    title,
    date,
    amount,
    statusColor,
    logo,
}: Props) {
    const simpleDate = new Date(date);
    const formattedDate = simpleDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = simpleDate.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
    });
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
                        {formattedDate} at {formattedTime}
                    </Text>
                </View>
            </View>

            <Text
                className={`font-semibold ${statusColor === 'success' ? "text-emerald-600" : "text-red-600"
                    }`}
            >
                {amount}
            </Text>
        </View>
    );
}
