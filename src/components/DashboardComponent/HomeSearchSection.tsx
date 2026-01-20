
// import { IShareDetail } from "@/src/model/shares.interface";
// import { useMemo, useState } from "react";
// import { FlatList, View } from "react-native";
// import SearchBar from "../shared/SearchBar";
// import ShareCard from "../shared/ShareCard";
// import SharePopup from "../shared/SharePopup";

// export default function Home({ shares = [] }: any) {
//     const [query, setQuery] = useState("");
//     const [open, setOpen] = useState(false);
//     const [selectedShare, setSelectedShare] = useState<IShareDetail | undefined>();

//     const filteredShares = useMemo(() => {
//         if (!query.trim()) return [];
//         return shares.filter((s: any) =>
//             s.company.toLowerCase().includes(query.toLowerCase())
//         );
//     }, [query, shares]);

//     const handleSelectedShare = (share: IShareDetail) => {
//         setOpen(true);
//         setSelectedShare(share)
//     }

//     return (
//         <>
//             <FlatList
//                 data={filteredShares}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => <ShareCard share={item}
//                     onPress={() => handleSelectedShare(item)} />}
//                 keyboardShouldPersistTaps="handled"
//                 showsVerticalScrollIndicator={false}
//                 scrollEnabled={false}

//                 /** ✅ EVERYTHING THAT WAS ABOVE GOES HERE */
//                 ListHeaderComponent={
//                     <View>
//                         {/* <Header /> */}
//                         <SearchBar value={query} onChangeText={setQuery} />
//                     </View>
//                 }

//                 /** Optional empty state */
//                 ListEmptyComponent={
//                     query ? null : null
//                 }
//             />
//             <SharePopup
//                 visible={open}
//                 onClose={() => setOpen(false)}
//                 share={{
//                     id: selectedShare?.id ?? 0,
//                     company: selectedShare?.company ?? '',
//                     price: selectedShare?.price ?? 0,
//                     minQuantity:
//                         typeof selectedShare?.minQuantity === "string"
//                             ? parseInt(selectedShare.minQuantity, 10)
//                             : selectedShare?.minQuantity ?? 0,
//                 }}
//             /></>
//     );
// }


import { Search } from "lucide-react-native";
import { TextInput, View } from "react-native";

type Props = {
    value: string;
    onChangeText: (text: string) => void;
};

export default function HomeSearchSection({ value, onChangeText }: Props) {
    return (
        <View className="flex-row items-center bg-white px-4 py-3 rounded-xl shadow-sm mb-4">
            <Search size={18} color="#6B7280" />

            <TextInput
                placeholder="Search company, brand or sector"
                value={value}
                onChangeText={onChangeText}
                className="flex-1 ml-3 text-gray-800"
                placeholderTextColor="#9CA3AF"
            />
        </View>
    );
}
