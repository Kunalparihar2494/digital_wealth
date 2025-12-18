

import ComingSoon from "@/src/components/shared/Comingsoon";
import Header from "@/src/components/shared/Header";
import { View } from "react-native";

export default function Chat() {
    return (
        <View className="flex-1 bg-gray-100">
            <Header />

            <View className="flex-1">
                <ComingSoon />
            </View>
        </View>
    );
}
