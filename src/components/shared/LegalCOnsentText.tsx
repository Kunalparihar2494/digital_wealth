import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type LinkItem = {
  label: string;
  url: string;
};

type Props = {
  appName?: string;
  links?: LinkItem[];
};

export default function LegalConsentText({
  appName = "Digital Wealth",
  links = [
    { label: "Terms & Conditions", url: "https://digitalwealth.in/Home/TermsCondition" },
    { label: "Disclaimer", url: "https://digitalwealth.in/Home/Disclaimer" },
    { label: "Privacy Policy", url: "https://digitalwealth.in/Home/PrivacyPolicy" },
    { label: "Cancellation & Refund", url: "https://digitalwealth.in/Home/CancelandRefund" },
  ],
}: Props) {
  return (
    <View className="mt-4 px-4">
      <Text className="text-xs text-gray-500 text-center leading-4">
        By continuing, you agree to {appName}{" "}
        {links.map((item, index) => (
          <Text key={item.label}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(legal)/webview",
                  params: {
                    url: item.url,
                    title: item.label,
                  },
                })
              }
            >
              <Text className="text-blue-600 underline">
                {item.label}
              </Text>
            </TouchableOpacity>
            {index < links.length - 1 ? ", " : "."}
          </Text>
        ))}
      </Text>
    </View>
  );
}
