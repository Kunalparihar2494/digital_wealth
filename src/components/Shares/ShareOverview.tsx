// src/components/ShareDetail/ShareOverviewCard.tsx
import { Image, Text, View } from "react-native";

type Props = {
  name: string;
  price: string;
  logo: string;
  minQuantity?: number | string;
  change?: string;
};

export default function ShareOverviewCard({ name, price, logo, minQuantity, change }: Props) {

  return (
    <View className="mx-4 bg-white rounded-2xl p-5 shadow mb-6">
      <View className="flex-row items-center mb-4">
        <View className="w-16 h-16 bg-gray-100 rounded-xl items-center justify-center mr-4">
          {/* <Text className="font-bold text-red-500 text-lg">OYO</Text> */}
          <Image
            source={{ uri: logo }}
            className="w-14 h-14"
            resizeMode="contain"
          />
        </View>
        {/* <View className="items-center mb-3">
          {logo ? (
            <Image
              source={{ uri: logo }}
              className="w-14 h-14"
              resizeMode="contain"
            />
          ) : (
            <View className="w-14 h-14 rounded-full bg-gray-200" />
          )}
        </View> */}

        <Text className="text-lg font-semibold text-gray-800 flex-1">
          {name}
        </Text>
      </View>

      <Text className="text-gray-500 mb-1">Last Transaction Price</Text>

      <View className="flex-row items-center justify-between">
        <Text className="text-3xl font-bold text-gray-900">{price}</Text>

        <View className="bg-purple-100 px-3 py-1 rounded-full">
          <Text className="text-purple-700 font-medium">{change}</Text>
        </View>
      </View>
    </View>
  );
}
