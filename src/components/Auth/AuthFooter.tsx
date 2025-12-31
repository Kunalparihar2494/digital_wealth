// src/components/auth/AuthFooterActions.tsx
import { Fingerprint } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function AuthFooterActions() {
    return (
        <View className="flex-row justify-between items-center mt-6 px-2">
            <TouchableOpacity className="flex-row items-center">
                <Fingerprint size={18} color="#374151" />
                <Text className="ml-2 text-sm text-gray-700">
                    Use Biometrics
                </Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text className="text-sm text-gray-700">
                    Guest Mode
                </Text>
            </TouchableOpacity>
        </View>
    );
}
