import { router, usePathname } from "expo-router";
import { useEffect, useRef } from "react";
import { Alert, BackHandler, ToastAndroid } from "react-native";
import { useAuthStore } from "../store/auth.store";

export default function BackHandlerProvider() {
  const pathname = usePathname();
  const backPressedOnce = useRef(false);

  console.log("BackHandlerProvider mounted");

  useEffect(() => {
    const onBackPress = () => {
      console.log("CURRENT PATH:", pathname);

      // If NOT on home tab → navigate home
      if (!pathname.includes("home")) {
        console.log("Current Path -", pathname);
        router.replace("/home");
        return true;
      }

      // Already on home
      if (backPressedOnce.current) {
        Alert.alert("Logout", "Do you want to logout?", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: () => {
              useAuthStore.getState().logout();
              BackHandler.exitApp();
            },
          },
        ]);

        return true;
      }

      backPressedOnce.current = true;

      ToastAndroid.show("Press back again to logout", ToastAndroid.SHORT);

      setTimeout(() => {
        backPressedOnce.current = false;
      }, 2000);

      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );

    return () => subscription.remove();
  }, [pathname]);

  return null;
}
