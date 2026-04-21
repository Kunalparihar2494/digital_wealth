import { Stack } from "expo-router";
import { useEffect } from "react";
import './global.css';

export default function RootLayout() {
  // Network stack warmup - fixes Android fetch issues on first API call
  useEffect(() => {
    const warmupNetwork = async () => {
      try {
        // Make a simple GET request to warm up the network stack
        // This resolves an issue where API calls fail on first use on Android
        await fetch("https://www.google.com", { method: "GET" });
      } catch (error) {
        // Silently fail - this is just a warmup call
      }
    };

    warmupNetwork();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
