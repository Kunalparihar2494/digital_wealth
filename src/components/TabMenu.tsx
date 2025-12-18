// src/components/TabMenu.tsx
import { ScrollView, Text, TouchableOpacity } from "react-native";

type TabMenuProps = {
    tabs: string[];
    activeTab: string;
    onChange: (tab: string) => void;
};

export default function TabMenu({ tabs, activeTab, onChange }: TabMenuProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingRight: 24, // 👈 prevents last tab cut
            }}
            className="mt-4"
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab;

                return (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => onChange(tab)}
                        className="mr-6"
                        activeOpacity={0.7}
                    >
                        <Text
                            className={`pb-2 font-medium ${isActive
                                ? "text-emerald-600 border-b-2 border-emerald-600"
                                : "text-gray-500"
                                }`}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}
