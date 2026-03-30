import { Search } from "lucide-react-native";
import { TextInput, View } from "react-native";

type Props = {
    value: string;
    onChangeText: (text: string) => void;
};

export default function HomeSearchSection({ value, onChangeText }: Props) {
    return (
        <View className="flex-row items-center bg-white px-4 py-3 rounded-xl shadow-sm mb-4">
            <Search size={18} color="#6B7280" />

            <TextInput
                placeholder="Search company, brand or sector"
                value={value}
                onChangeText={onChangeText}
                className="flex-1 ml-3 text-gray-800"
                placeholderTextColor="#9CA3AF"
            />
        </View>
    );
}
