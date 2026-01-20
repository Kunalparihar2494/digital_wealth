import { TextInput, View } from "react-native";

type Props = {
    value: string;
    onChange: (text: string) => void;
};

export default function ShareSearch({ value, onChange }: Props) {
    return (
        <View className="bg-gray-100 rounded-xl px-4 py-3 flex-row items-center">
            <TextInput
                placeholder="Search company or brand"
                value={value}
                onChangeText={onChange}
                className="flex-1 text-gray-700"
            />
        </View>
    );
}
