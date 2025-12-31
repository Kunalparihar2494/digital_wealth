// src/components/auth/AuthBrandHeader.tsx
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";

export default function AuthBrandHeader() {
    return (
        <View className="flex-row items-center mb-6">
            <View
                style={{
                    width: 72,
                    height: 72,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 14,
                }}
            >
                {/* 🌈 OUTER GLOW / SPRAY */}
                <LinearGradient
                    colors={[
                        "rgba(16,185,129,0.35)", // emerald glow
                        "rgba(20,184,166,0.15)",
                        "rgba(20,184,166,0.05)",
                    ]}
                    style={{
                        position: "absolute",
                        width: 72,
                        height: 72,
                        borderRadius: 36,
                    }}
                />

                {/* 🎯 MAIN LOGO CIRCLE */}
                <LinearGradient
                    colors={["#10B981", "#14B8A6"]}
                    style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        source={require("@/assets/images/appstore.png")}
                        style={{ width: 32, height: 32 }}
                        resizeMode="contain"
                    />
                </LinearGradient>
            </View>

            <View>
                <Text className="text-3xl font-bold text-gray-700">
                    Digital Wealth
                </Text>
                <Text className="text-xs text-gray-500 mt-0.5">
                    secure access to your invested wealth
                </Text>
            </View>
        </View>
    );
}
