import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";

//  colors={["#e5e7eb", "#9ca3af"]}

export function MarginCard({ amount }: { amount?: number }) {
    return (
        <LinearGradient
            colors={["#9ca3af", "#e5e7eb"]}
            className="rounded-2xl px-4 py-5 mb-5"
            style={{ borderRadius: 10 }}
        >
            <Text className="text-gray-700 text-sm mb-2">
                Available margin
            </Text>

            <Text className="text-gray-700 text-3xl font-bold mb-2">
                ₹{amount?.toFixed(2)}
            </Text>

            <TouchableOpacity>
                <Text className="text-blue-400 text-sm">View statement</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}
