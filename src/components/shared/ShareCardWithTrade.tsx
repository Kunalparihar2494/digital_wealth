import { IShareDetail } from "@/src/model/shares.interface";
import BottomSheet from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ShareCardProps {
  share: IShareDetail;
}

export default function ShareCardWithTrade({ share }: ShareCardProps) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%"], []);

  const openSheet = () => {
    sheetRef.current?.expand();
  };

  const closeSheet = () => {
    sheetRef.current?.close();
  };

  return (
    <>
      {/* ===== SHARE CARD ===== */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={openSheet}
        className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
      >
        <View className="flex-row items-center">
          <Image
            source={{ uri: `https://digitalwealth.in/upload/${share.logo}` }}
            className="w-10 h-10 mr-3"
            resizeMode="contain"
          />

          <View className="flex-1">
            <Text className="font-semibold text-gray-800">
              {share.company}
            </Text>
            <Text className="text-xs text-gray-500">
              Min Qty: {share.minQuantity}
            </Text>
          </View>

          <Text className="font-semibold text-emerald-600">
            ₹{share.price ?? 0}
          </Text>
        </View>
      </TouchableOpacity>

      {/* ===== TRADE BOTTOM SHEET ===== */}
      <BottomSheet
        ref={sheetRef}
        index={-1}                 // closed by default
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ borderRadius: 24 }}
      >
        <View className="px-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            {share.company}
          </Text>

          {/* BUY */}
          <TouchableOpacity
            className="mb-3 rounded-xl overflow-hidden"
            onPress={closeSheet}
          >
            <LinearGradient
              colors={["#16A34A", "#22C55E"]}
              className="py-3 items-center"
            >
              <Text className="text-white font-semibold text-base">
                Buy
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* SELL */}
          <TouchableOpacity
            className="bg-red-500 py-3 rounded-xl"
            onPress={closeSheet}
          >
            <Text className="text-white text-center font-semibold text-base">
              Sell
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
}
