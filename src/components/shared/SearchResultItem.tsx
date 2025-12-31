// src/components/SearchResultItem.tsx
import { Text, TouchableOpacity } from "react-native";

export function SearchResultItem({
    company,
    sector,
    onPress,
}: {
    company: string;
    sector: string;
    onPress?: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="px-4 py-3 border-b border-gray-100"
        >
            <Text className="text-gray-900 font-medium">{company}</Text>
            <Text className="text-xs text-gray-500 capitalize">{sector}</Text>
        </TouchableOpacity>
    );
}
