import React from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";

interface KYCCardProps {
    onPress?: () => void;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    imageSource?: any;
}

export default function KYCCard({
    onPress,
    title = "Complete your KYC to continue",
    subtitle = "Ensure compliance and unlock all features",
    buttonText = "Continue",
    imageSource = require('@/assets/images/kyc.jpg')
}: KYCCardProps) {
    return (
        // <View className="w-90 h-20 absolute rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <ImageBackground
            source={imageSource}
            resizeMode="cover"
            className="bg-blue-50 rounded-2xl border border-gray-300 overflow-hidden"
            imageStyle={{
                borderRadius: 16,
            }}
            style={{ width: "100%", height: 200 }}
        >
            {/* <View>
                <Text className="text-primary text-center mt-2 font-bold text-pretty text-lg w-3/4">
                    {title}
                </Text>
            </View> */}

            <View className=" flex-1 mt-4 ml-2 justify-normal items-center" style={{ width: "auto" }}>
                <TouchableOpacity
                    onPress={onPress}
                    className="bg-secondary py-3 rounded-lg mx-10" style={{ width: 150 }}
                >
                    <Text className="text-white text-center font-semibold">
                        {buttonText}
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
        // </View>
    );
}
