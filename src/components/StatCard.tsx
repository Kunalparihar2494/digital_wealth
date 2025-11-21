// src/components/StatCard.tsx
import { View, Text, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { ShoppingCart, XCircle, CheckCircle, Timer } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";


const icons = {
    cart: ShoppingCart,
    cancel: XCircle,
    confirm: CheckCircle,
    pending: Timer,
};

type StatCardProps = {
    title: string;
    value: string | number;
    icon: keyof typeof icons;
    colors: {
        bg: string;
        icon: string;
    };
};

export default function StatCard({ title, value, icon, colors }: StatCardProps) {
    const Icon = icons[icon];

    const shimmerAnim = useRef(new Animated.Value(-250)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerAnim, {
                toValue: 250,
                duration: 1800,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#1c5894",
                padding: 16,
                borderRadius: 16,
                overflow: "hidden",
                marginRight: 10,
            }}
        >
            {/* SHIMMER ANIMATION OVERLAY */}
            <Animated.View
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: 150,
                    transform: [{ translateX: shimmerAnim }],
                }}
            >
                <LinearGradient
                    colors={[
                        "transparent",
                        "rgba(255,255,255,0.35)",
                        "transparent",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1 }}
                />

            </Animated.View>

            {/* CONTENT */}
            <Icon color="white" size={28} />
            <Text style={{ marginTop: 10, color: "#fff", fontSize: 14 }}>{title}</Text>
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
                {value}
            </Text>
        </View>
    );
}
