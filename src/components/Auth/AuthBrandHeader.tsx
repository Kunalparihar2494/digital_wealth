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