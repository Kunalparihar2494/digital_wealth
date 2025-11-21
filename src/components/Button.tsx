import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    color?: string;
}

export default function Button({
    title,
    onPress,
    loading = false,
    color = "bg-green-600",
}: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={loading}
            className={`${color} py-3 rounded-full mt-4`}
        >
            <Text className="text-white text-center text-lg font-semibold">
                {loading ? "Please wait..." : title}
            </Text>
        </TouchableOpacity>
    );
}
