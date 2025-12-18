import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";

export default function BrandHeader() {
    const SIZE = 80;

    return (
        <View style={{ alignItems: "center", marginBottom: 24 }}>
            {/* ✅ GRADIENT CIRCLE */}
            <LinearGradient
                colors={["#10B981", "#14B8A6", "#06B6D4"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    width: SIZE,
                    height: SIZE,
                    borderRadius: SIZE / 2, // 🔥 THIS IS THE KEY
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                }}
            >
                <Image
                    source={require("@/assets/images/appstore.png")}
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                />
            </LinearGradient>

            {/* ✅ GRADIENT TEXT */}
            <MaskedView
                maskElement={
                    <Text style={{ fontSize: 32, fontWeight: "700" }}>
                        Digital Wealth
                    </Text>
                }
            >
                <LinearGradient
                    colors={["#10B981", "#14B8A6", "#06B6D4"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text
                        style={{
                            fontSize: 32,
                            fontWeight: "700",
                            opacity: 0,
                        }}
                    >
                        Digital Wealth
                    </Text>
                </LinearGradient>
            </MaskedView>
        </View>
    );
}
