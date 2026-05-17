import {
    ArrowDownLeft,
    ArrowUpRight,
} from "lucide-react-native";
import React from "react";
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
    label: string;
    color: string;
    onPress?: () => void;
    disabled?: boolean;
    loading?: boolean;
};

export function FundsActionButton({
    label,
    color,
    onPress,
    disabled = false,
    loading = false,
}: Props) {
    const isWithdraw =
        label.toLowerCase().includes("withdraw");

    return (
        <TouchableOpacity
            activeOpacity={0.88}
            onPress={onPress}
            disabled={disabled || loading}
            style={{
                flex: 1,
                backgroundColor: disabled
                    ? "#D1D5DB"
                    : color,
                borderRadius: 20,
                paddingVertical: 16,
                paddingHorizontal: 18,
                shadowColor: "#000",
                shadowOpacity: disabled ? 0 : 0.08,
                shadowRadius: 10,
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                elevation: disabled ? 0 : 4,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <>
                        <View
                            style={{
                                width: 34,
                                height: 34,
                                borderRadius: 999,
                                backgroundColor:
                                    "rgba(255,255,255,0.18)",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: 10,
                            }}
                        >
                            {isWithdraw ? (
                                <ArrowUpRight
                                    size={18}
                                    color="#fff"
                                />
                            ) : (
                                <ArrowDownLeft
                                    size={18}
                                    color="#fff"
                                />
                            )}
                        </View>

                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 16,
                                fontWeight: "700",
                                letterSpacing: 0.2,
                            }}
                        >
                            {label}
                        </Text>
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
}