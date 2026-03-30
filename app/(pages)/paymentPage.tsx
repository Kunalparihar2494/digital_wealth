import Header from "@/src/components/shared/Header";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { WebView } from "react-native-webview";

export default function PaymentPage() {
    const { gatewayPayload } = useLocalSearchParams();
    const uri = Array.isArray(gatewayPayload) ? gatewayPayload[0] : gatewayPayload;
    const [loading, setLoading] = useState(true);

    const handleNavigationStateChange = (navState: any) => {
        console.log("URL changed:", navState.url);

        // Check if payment completed/cancelled/failed
        if (navState.url.includes("success") || navState.url.includes(" ")) {
            Alert.alert("Success", "Payment completed!");
            router.back();
        } else if (navState.url.includes("MFailure")) {
            Alert.alert("Payment Failed", "Transaction was cancelled or failed");
            router.back();
        }
    };

    return (
        <View className="flex-1 bg-white">
            <Header showBackButton />
            <WebView
                source={{ uri: uri || "" }}
                onNavigationStateChange={handleNavigationStateChange}
                onLoadEnd={() => setLoading(false)}
                onError={(error) => {
                    console.log("WebView Error:", error);
                    Alert.alert("Error", "Failed to load payment page");
                    router.back();
                }}
                startInLoadingState
                javaScriptEnabled
                domStorageEnabled
            />
        </View>
    );
}
