// src/components/TabMenu.tsx
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type TabMenuProps = {
    tabs: string[];
    activeTab: string;
    onChange: (tab: string) => void;
    counts?: Record<string, number>;
};

export default function TabMenu({ tabs, activeTab, onChange, counts = {} }: TabMenuProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingRight: 24,
            }}
            className="mt-5"
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab;
                const count = counts[tab] ?? 0;

                return (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => onChange(tab)}
                        className="mr-7 items-center"
                        activeOpacity={0.7}
                    >
                        {/* COUNT BADGE */}

                        <View
                            className={`mb-1 px-2 py-[2px] rounded-full ${isActive
                                ? "bg-emerald-600"
                                : "bg-gray-300"
                                }`}
                        >
                            <Text
                                className={`text-xs font-semibold ${isActive
                                    ? "text-white"
                                    : "text-gray-700"
                                    }`}
                            >
                                {count}
                            </Text>
                        </View>


                        {/* TAB TEXT */}
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
