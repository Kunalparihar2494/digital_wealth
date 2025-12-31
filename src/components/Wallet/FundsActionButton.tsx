import { Text, TouchableOpacity } from "react-native";

export function FundsActionButton({
    label,
    color,
    onPress,
}: {
    label: string;
    color: string;
    onPress?: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-1 py-4 rounded-xl items-center"
            style={{ backgroundColor: color }}
        >
            <Text className="text-white font-semibold text-base">{label}</Text>
        </TouchableOpacity>
    );
}
