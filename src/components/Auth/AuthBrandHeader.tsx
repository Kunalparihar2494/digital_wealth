// src/components/auth/AuthBrandHeader.tsx
import { Image, View } from "react-native";

export default function AuthBrandHeader() {
    return (
        <View className="items-center mb-6">
      <Image
        source={require("@/assets/images/loginbg.png")}
        style={{ width: 140, height: 140 }}
        resizeMode="contain"
      />
    </View>
    );
}


//  <View className="flex-row items-center mb-6">
//             <View
//                 style={{
//                     width: 72,
//                     height: 72,
//                     alignItems: "center",
//                     justifyContent: "center",
//                     marginRight: 14,
//                 }}
//             >
                
//                 <LinearGradient
//                     colors={[
//                         "rgba(16,185,129,0.35)",
//                         "rgba(20,184,166,0.15)",
//                         "rgba(20,184,166,0.05)",
//                     ]}
//                     style={{
//                         position: "absolute",
//                         width: 72,
//                         height: 72,
//                         borderRadius: 36,
//                     }}
//                 />

//                 <LinearGradient
//                     colors={["#10B981", "#14B8A6"]}
//                     style={{
//                         width: 56,
//                         height: 56,
//                         borderRadius: 28,
//                         alignItems: "center",
//                         justifyContent: "center",
//                     }}
//                 >
//                 <Image
//                     source={require("@/assets/images/appstore.png")}
//                     style={{ height: 100, borderRadius: 4 }}
//                     resizeMode="contain"
//                 />

//             </View>

//             <View>
//                 <Text className="text-3xl font-bold text-gray-700">
//                     Digital Wealth
//                 </Text>
//                 <Text className="text-xs text-gray-500 mt-0.5">
//                     secure access to your invested wealth
//                 </Text>
//             </View>
//         </View>