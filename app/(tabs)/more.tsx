
import ComingSoon from "@/src/components/Comingsoon";
import Header from "@/src/components/Header";
import { View } from "react-native";

export default function More() {
    return (
        <View className="flex-1 bg-gray-100">
            <Header />

            <View className="flex-1">
                <ComingSoon />
            </View>
        </View>

    );
}
