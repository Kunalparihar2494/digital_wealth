import Header from "@/src/components/shared/Header";
import { getToken } from "@/src/utils/storage";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function KycPage() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        async function fetchToken() {
            const tok = await getToken();
            setToken(tok)
        }
        fetchToken();
    }, []);

    if (!token) return null;

    return (
        <View className="flex-1 bg-white">
            <Header showBackButton />

            <WebView
                source={{
                    uri: "https://digitalwealth.in/Auth/KYCPage",
                    headers: {
                        token
                    },
                }}
                startInLoadingState
                javaScriptEnabled
                domStorageEnabled
            />
        </View>
    );
}
