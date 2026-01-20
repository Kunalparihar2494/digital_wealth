import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
    icon: React.ReactNode;
    label: string;
    onPress?: () => void;
    isLast?: boolean;
    danger?: boolean;
};

export default function ProfileMenuItem({
    icon,
    label,
    onPress,
    isLast,
    danger,
}: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className={`flex-row items-center justify-between px-4 py-4 ${!isLast ? "border-b border-gray-200" : ""
                }`}
        >
            <View className="flex-row items-center gap-3">
                {icon}
                <Text
                    className={`text-base ${danger ? "text-red-600" : "text-gray-900"
                        }`}
                >
                    {label}
                </Text>
            </View>

            {!danger && <ChevronRight size={18} color="#9CA3AF" />}
        </TouchableOpacity>
    );
}
