// src/components/auth/AuthCard.tsx
import { View } from "react-native";

export default function AuthCard({ children }: { children: React.ReactNode }) {
    return (
        <View className="bg-gray-300 rounded-3xl px-6 py-8 shadow-md w-full max-w-sm">
            {children}
        </View>
    );
}
