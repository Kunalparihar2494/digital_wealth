import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
    label: string;
    icon?: React.ReactNode;
    onPress?: () => void;
};

export function AccountItem({ label, icon, onPress }: Props) {

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
        >
            <View className="flex-row items-center">
                {icon && <View className="mr-3">{icon}</View>}
                <Text className="text-gray-800 text-base">{label}</Text>
            </View>

            <ChevronRight size={18} color="#9CA3AF" />
        </TouchableOpacity>
    );
}
