import { MoveRight } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

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
    <View className="flex-row justify-between items-center mt-4 mb-2">
      <Text className="text-lg font-semibold text-gray-900">
        {title}
      </Text>

      <Text className="text-emerald-600 font-medium">
        <MoveRight color={'#059669'} size={20} />
      </Text>

      {/* {onToggle && (
        <TouchableOpacity onPress={onToggle}>
          <Text className="text-emerald-600 font-medium">
            {expanded ? "Show Less ↑" : "Show More ↓"}
          </Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
}
