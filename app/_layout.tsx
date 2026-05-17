import BackHandlerProvider from "@/src/utils/backhandlerprovider";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import './global.css';

export default function RootLayout() {
  useEffect(() => {
    const warmupNetwork = async () => {
      try {
        // Warm up against your actual API host, not google.com
        await fetch("https://digitalwealth.in/", {
          method: "HEAD",
          // Short timeout — this is just a warmup
          signal: AbortSignal.timeout(5000),
        });
      } catch {
        // Silently fail
      }
    };
    warmupNetwork();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <BackHandlerProvider />
    </>
  )

}