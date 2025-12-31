
import { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import SearchBar from "../shared/SearchBar";
import ShareCard from "../shared/ShareCard";

export default function Home({ shares = [] }: any) {
    const [query, setQuery] = useState("");

    const filteredShares = useMemo(() => {
        if (!query.trim()) return [];
        return shares.filter((s: any) =>
            s.company.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, shares]);

    return (
        <FlatList
            data={filteredShares}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ShareCard share={item}
                onPress={() => console.log("Buy", item.company)} />}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}

            /** ✅ EVERYTHING THAT WAS ABOVE GOES HERE */
            ListHeaderComponent={
                <View>
                    {/* <Header /> */}
                    <SearchBar value={query} onChangeText={setQuery} />
                </View>
            }

            /** Optional empty state */
            ListEmptyComponent={
                query ? null : null
            }
        />
    );
}
