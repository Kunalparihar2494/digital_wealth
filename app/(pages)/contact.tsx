import Header from "@/src/components/shared/Header";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function ContactUs() {
    return (
        <View className="flex-1 bg-white">
            <Header showBackButton />

            <WebView
                source={{
                    uri: "https://digitalwealth.in/Home/ContactUs",
                }}
                startInLoadingState
                javaScriptEnabled
                domStorageEnabled
            />
        </View>
    );
}
