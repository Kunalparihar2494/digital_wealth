import Header from "@/src/components/Header";
import SafeAreaWrapper from "@/src/components/SafeAreaWrapper";
import { View, Text } from "react-native";

export default function Chat() {
    return (
        <SafeAreaWrapper>
            <Header />
            <Text className="text-lg font-semibold text-gray-800">Chat Screen 💬</Text>
        </SafeAreaWrapper>
    );
}
