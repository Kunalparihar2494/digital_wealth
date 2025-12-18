import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export const AboutComponent: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome to Digital Wealth</Text>
            </View>

            <View style={styles.main}>
                <View style={styles.hero}>
                    <Text style={styles.heroText}>
                        Manage your financial portfolio and track your wealth growth.
                    </Text>
                </View>

                <View style={styles.features}>
                    <View style={styles.featureCard}>
                        <Text style={styles.cardTitle}>Portfolio Overview</Text>
                        <Text style={styles.cardText}>View your total assets and allocations at a glance.</Text>
                    </View>

                    <View style={styles.featureCard}>
                        <Text style={styles.cardTitle}>Performance Tracking</Text>
                        <Text style={styles.cardText}>Monitor your investments and performance metrics.</Text>
                    </View>

                    <View style={styles.featureCard}>
                        <Text style={styles.cardTitle}>Insights</Text>
                        <Text style={styles.cardText}>Get actionable insights to optimize your wealth.</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { padding: 20, alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold' },
    main: { padding: 20 },
    hero: { marginBottom: 20 },
    heroText: { fontSize: 16, textAlign: 'center', color: '#666' },
    features: { gap: 15 },
    featureCard: { padding: 15, borderRadius: 8, backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#e0e0e0' },
    cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
    cardText: { fontSize: 14, color: '#666' },
});