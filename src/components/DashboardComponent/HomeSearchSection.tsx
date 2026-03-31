import { Search, SlidersHorizontal } from "lucide-react-native";
import { useState } from "react";
import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
    value: string;
    onChangeText: (text: string) => void;
    selectedFilter: number;
    onFilterChange: (filter: number) => void;
    filterValue: [{ id: number, filterName: string }]
};

// const FILTER_OPTIONS = ["All", "Company", "Brand", "Sector"];

export default function HomeSearchSection({
    value,
    onChangeText,
    selectedFilter,
    onFilterChange,
    filterValue
}: Props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const FILTER_OPTIONS = filterValue;
    return (
        <>
            <View className="flex-row items-center bg-white px-4 py-3 rounded-xl shadow-sm mb-4">
                <Search size={18} color="#6B7280" />

                <TextInput
                    placeholder="Search company, brand or sector"
                    value={value}
                    onChangeText={onChangeText}
                    className="flex-1 ml-3 text-gray-800"
                    placeholderTextColor="#9CA3AF"
                />

                {/* Filter Icon */}
                <TouchableOpacity onPress={() => setShowDropdown(true)}>
                    <SlidersHorizontal size={18} color="#6B7280" />
                </TouchableOpacity>
            </View>

            {/* Dropdown Modal */}
            <Modal
                visible={showDropdown}
                transparent
                animationType="fade"
            >
                <TouchableOpacity
                    className="flex-1 bg-black/20 justify-start"
                    activeOpacity={1}
                    onPress={() => setShowDropdown(false)}
                >
                    <View className="bg-white mx-4 mt-24 rounded-xl shadow-lg p-2">
                        {FILTER_OPTIONS.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    onFilterChange(item.id);
                                    setShowDropdown(false);
                                }}
                                className={`px-4 py-3 rounded-l`}
                            // className={`px-4 py-3 rounded-lg ${selectedFilter === Number(item.id)
                            //     ? "bg-gray-100"
                            //     : ""
                            //     }`}
                            >
                                <Text className="text-gray-800">
                                    {item.filterName}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}
