import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    color?: string;
    disabled?: boolean;
}

export default function Button({
    title,
    onPress,
    loading = false,
    color = "bg-green-600",
    disabled = false,
}: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            className={`${color} py-3 rounded-xl mt-4 ${disabled || loading ? "opacity-50" : ""
                }`}
        >
            <Text className="text-white text-center text-lg font-semibold">
                {loading ? "Please wait..." : title}
            </Text>
        </TouchableOpacity>
    );
}
