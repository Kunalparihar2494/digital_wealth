import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewPage() {
    const { url, title } = useLocalSearchParams<{
        url: string;
        title?: string;
    }>();

    if (!url) return null;

    return (
        <View className="flex-1 bg-white">
            {/* <Header /> */}

            <WebView
                source={{ uri: url }}
                startInLoadingState
                renderLoading={() => (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" />
                    </View>
                )}
            />
        </View>
    );
}
