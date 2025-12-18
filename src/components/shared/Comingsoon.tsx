import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ComingSoon() {
    return (
        <View className="flex-1 bg-white items-center justify-center px-6">

            {/* Illustration */}
            <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/5956/5956498.png" }}
                style={{ width: 220, height: 220 }}
            />

            {/* Title */}
            <Text className="text-3xl font-bold text-gray-900 mt-6 text-center">
                Under Construction
            </Text>

            {/* Subtitle */}
            <Text className="text-gray-600 text-center mt-2 mb-6">
                We’re working hard to bring this feature to you.
                Please check back soon!
            </Text>

            {/* Loading Indicator */}
            {/* <ActivityIndicator size="large" color="#1c5894" /> */}

            {/* Button */}
            <TouchableOpacity
                className="bg-primary px-6 py-3 rounded-full mt-8"
                onPress={() => {
                    if (router.canGoBack()) router.back();
                    else router.replace("/(auth)/login");
                }}
            >
                <Text className="text-white text-lg font-semibold">Go Back</Text>
            </TouchableOpacity>

        </View>
    );
}
