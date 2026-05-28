// app/(tabs)/_layout.tsx

import BottomTabs from "@/src/components/shared/BottomTabs";
import { BOTTOM_TABS, getBottomTabIndex } from "@/src/constants/bottomTabs";
import { router, Stack, usePathname } from "expo-router";
import React, { useMemo } from "react";
import { PanResponder, View } from "react-native";

export default function TabsLayout() {
    const pathname = usePathname();

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: (_, gestureState) => {
                    const horizontalMove = Math.abs(gestureState.dx);
                    const verticalMove = Math.abs(gestureState.dy);

                    return horizontalMove > 24 && horizontalMove > verticalMove * 1.5;
                },
                onPanResponderRelease: (_, gestureState) => {
                    const currentIndex = getBottomTabIndex(pathname);
                    if (currentIndex === -1) return;

                    const isLeftSwipe = gestureState.dx < -60;
                    const isRightSwipe = gestureState.dx > 60;
                    if (!isLeftSwipe && !isRightSwipe) return;

                    const nextIndex = isLeftSwipe ? currentIndex + 1 : currentIndex - 1;
                    const nextTab = BOTTOM_TABS[nextIndex];

                    if (nextTab) {
                        router.replace(nextTab.route);
                    }
                },
            }),
        [pathname],
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }} {...panResponder.panHandlers}>
                <Stack screenOptions={{ headerShown: false }} />
            </View>
            <BottomTabs />
        </View>
    );
}
