import { Search } from "lucide-react-native";
import React from "react";
import { TextInput, View } from "react-native";

export default function SearchBar({ value, onChangeText }: any) {
    return (
        <View className="flex-row items-center bg-gray-300 px-4 py-3 rounded-full mb-4 mx-4" style={{ borderRadius: 10 }}>
            <Search size={20} color="#555" />

            <TextInput
                placeholder="Search company or symbol..."
                value={value}
                onChangeText={onChangeText}
                className="flex-1 ml-3 text-gray-700"
                placeholderTextColor="#777"
            />
        </View>
    );
}
