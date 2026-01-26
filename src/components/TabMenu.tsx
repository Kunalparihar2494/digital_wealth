import { Text, TouchableOpacity, View } from "react-native";

type TabMenuProps = {
    tabs: string[];
    activeTab: string;
    onChange: (tab: string) => void;
    counts?: Record<string, number>;
};

export default function TabMenu({
    tabs,
    activeTab,
    onChange,
    counts = {},
}: TabMenuProps) {
    return (
        <View
            className="flex-row bg-white border-b border-gray-200"
            style={{ width: "100%" }}
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab;
                const count = counts[tab] ?? 0;

                return (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => onChange(tab)}
                        activeOpacity={0.7}
                        className="flex-1 items-center py-3"
                    >
                        {/* COUNT BADGE */}
                        <View
                            className={`mb-1 px-2 py-[2px] rounded-full ${isActive ? "bg-emerald-600" : "bg-gray-300"
                                }`}
                        >
                            <Text
                                className={`text-xs font-semibold ${isActive ? "text-white" : "text-gray-700"
                                    }`}
                            >
                                {count}
                            </Text>
                        </View>

                        {/* TAB TEXT */}
                        <Text
                            className={`text-sm font-medium ${isActive ? "text-emerald-600" : "text-gray-500"
                                }`}
                        >
                            {tab}
                        </Text>

                        {/* ACTIVE INDICATOR */}
                        {isActive && (
                            <View className="absolute bottom-0 h-[2px] w-10 bg-emerald-600 rounded-full" />
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
