// app/(pages)/shareDetail.tsx
import Header from "@/src/components/shared/Header";
import BottomActionBar from "@/src/components/Shares/ActionBar";
import ShareOverviewCard from "@/src/components/Shares/ShareOverview";
import ValuationSection from "@/src/components/Shares/Valuation";
import { IShareDetail } from "@/src/model/shares.interface";
import { useShareStore } from "@/src/store/shares.store";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function ShareDetail() {

  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, loading, fetchShares } = useShareStore();
  const [share, setShare] = useState<IShareDetail | undefined>();

  useEffect(() => {
    if (!data) fetchShares();
  }, [data, loading, fetchShares])

  useEffect(() => {
    if (id) {
      fetchShareDetail(id);
    }
  }, [id]);

  const fetchShareDetail = async (id: string) => {
    const selectedShare: IShareDetail | undefined = data?.shares.find(val => id === (val.id).toLocaleString())
    setShare(selectedShare)
  };

  return (
    <View className="flex-1 bg-white">
      <Header showBackButton={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* <SegmentTabs /> */}
        <View className="my-4">
          <ShareOverviewCard
            name={share?.company ?? ''}
            price={(share?.price)?.toLocaleString() ?? '0'}
            logo={`https://digitalwealth.in/upload/${share?.logo}`}
            change="10%"
          />
        </View>

        <View className="my-2">
          {/* <ValuationSection
            marketCap="39,380 Cr+"
            yearLow="17"
            yearHigh="39"
            peRatio="183.33"
          /> */}
          <ValuationSection
            marketCap="39,380 Cr+"
            yearLow="17"
            yearHigh="39"
            peRatio="183.33" minQuantity={"100"} />

        </View>

      </ScrollView>

      <BottomActionBar share={share ? {
        id: share.id,
        company: share.company,
        price: share.price,
        minQuantity: typeof share.minQuantity === "string" ? Number(share.minQuantity) : share.minQuantity
      } : null} />
    </View>
  );
}
