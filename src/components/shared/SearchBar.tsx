// src/components/SearchBar.tsx
import { Search } from "lucide-react-native";
import { TextInput, View } from "react-native";

type Props = {
    value: string;
    onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
    return (
        <View className="flex-row items-center bg-gray-200 px-4 py-3 rounded-xl mb-3">
            <Search size={18} color="#555" />

            <TextInput
                placeholder="Search company or symbol..."
                value={value}
                onChangeText={onChangeText}
                className="flex-1 ml-3 text-gray-800"
                placeholderTextColor="#777"
            />
        </View>
    );
}
