import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
    const { loadUser } = useUserStore();
    const { setAuth } = useAuthStore();

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem("accessToken");
            if (token) {
                setAuth(token);
                await loadUser();
            }
        })();
    }, []);
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
        </Stack>
    );
}
