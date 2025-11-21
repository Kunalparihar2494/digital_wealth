import ComingSoon from "@/src/components/Comingsoon";
import Header from "@/src/components/Header";
import SafeAreaWrapper from "@/src/components/SafeAreaWrapper";
import { View, Text } from "react-native";

export default function More() {
    return (
        <View>
            <Header />
            <Text className="text-lg font-semibold text-gray-800">Coming Soon</Text>
            <ComingSoon />
        </View>

    );
}
