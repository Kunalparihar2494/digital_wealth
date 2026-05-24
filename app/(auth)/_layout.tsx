import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

export default function AuthLayout() {
    const { loadUser } = useUserStore();
    const { initializeAuth, getToken } = useAuthStore();

    useEffect(() => {
        (async () => {
            await initializeAuth();
            const token = await getToken();
            if (token) {
                await loadUser();
            }
        })();
    }, [getToken, initializeAuth, loadUser]);
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
        </Stack>
    );
}
