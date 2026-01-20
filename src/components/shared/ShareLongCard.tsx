import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
    logo?: string;
    price: number;
    name: string;
    min: number;
    max: number;
    minQuantity?: number;
    onPress?: () => void;
};

export default function ShareGridCard({
    logo,
    price,
    name,
    min,
    max,
    minQuantity,
    onPress
}: Props) {
    const rangePercent =
        max > min ? ((price - min) / (max - min)) * 100 : 0;

    return (

        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-1 my-2">
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    onPress?.();
                }}
                className=""
            >
                {/* LOGO */}
                <View className="items-center mb-3">
                    {logo ? (
                        <Image
                            source={{ uri: logo }}
                            className="w-14 h-14"
                            resizeMode="contain"
                        />
                    ) : (
                        <View className="w-14 h-14 rounded-full bg-gray-200" />
                    )}
                </View>

                {/* PRICE */}
                {/* <Text className="text-purple-600 text-lg font-bold mb-1">
                ₹ {price}
            </Text> */}
                <Text className="text-gray-800 text-lg font-bold mb-1">
                    ₹ {price}
                </Text>

                {/* NAME */}
                <Text
                    className="text-gray-600 font-medium mb-2"
                    numberOfLines={2}
                >
                    {name}
                </Text>

                {/* RANGE */}
                <Text className="text-xs text-gray-500 mb-1">
                    Min Quantity - {minQuantity ?? 0}
                </Text>

                {/* <View className="flex-row justify-between mb-1">
                <Text className="text-xs text-gray-600">{min}</Text>
                <Text className="text-xs text-gray-600">{max}</Text>
            </View> */}

                {/* PROGRESS BAR */}
                {/* <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <View
                    className="h-full bg-purple-600"
                    style={{ width: `${Math.min(Math.max(rangePercent, 0), 100)}%` }}
                />
            </View> */}
            </TouchableOpacity>
        </View>

    );
}
