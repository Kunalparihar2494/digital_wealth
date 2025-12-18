import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  expanded?: boolean;
  onToggle?: () => void;
};

export default function SectionHeaderDashBoard({
  title,
  expanded = false,
  onToggle,
}: Props) {
  return (
    <View className="flex-row justify-between items-center px-4 mt-6 mb-3">
      <Text className="text-lg font-semibold text-gray-900">
        {title}
      </Text>

      {onToggle && (
        <TouchableOpacity onPress={onToggle}>
          <Text className="text-emerald-600 font-medium">
            {expanded ? "Show Less ↑" : "Show More ↓"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
