// src/components/SectorSection.tsx
import { ScrollView } from "react-native";
import PortfolioCard from "../DashboardComponent/PortfolioCard";
import SectionHeaderDashBoard from "../DashboardComponent/SectionHeaderDashboard";


type SectorSectionProps = {
    title: string;
    data: any[];
};

export default function SectorSection({ title, data }: SectorSectionProps) {
    if (!data || data.length === 0) return null;

    return (
        <>
            <SectionHeaderDashBoard title={title} />

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-6"
            >
                {data.map((item, index) => (
                    <PortfolioCard
                        key={item.id ?? index}
                        title={item.company}
                        amount={`₹${item.price || 0}`}
                        image={item.logo} // optional (if you add image support)
                    />
                ))}
            </ScrollView>
        </>
    );
}
