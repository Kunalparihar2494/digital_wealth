import Header from "@/src/components/shared/Header";
import api from "@/src/services/api";
import { router } from "expo-router";
import { BadgeCheck, ShieldCheck } from "lucide-react-native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { WebView } from "react-native-webview";

export default function AadhaarVerifyScreen() {
    const [aadhaarName, setAadhaarName] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState("");
    const [verificationStatus, setVerificationStatus] = useState<
        null | "success" | "failed"
    >(null);

    const verifyAadhar = async () => {
        if (!aadhaarName.trim()) {
            Alert.alert(
                "Validation",
                "Please enter name as per Aadhaar"
            );
            return;
        }

        try {
            setLoading(true);
            setVerificationStatus(null);

            const payload = {
                nameAsPerAadhaar: aadhaarName.trim(),
            };

            const res = await api.post(
                "/AppAccess/initiate-aadhaar",
                payload
            );

            console.log(
                "Aadhar VERIFY RESPONSE:",
                res.data
            );

            if (
                res?.data?.success &&
                res?.data?.redirectUrl
            ) {
                setRedirectUrl(res.data.redirectUrl);
            } else {
                Alert.alert(
                    "Verification Failed",
                    res?.data?.message ||
                    "Unable to initiate Aadhaar verification"
                );
            }

        } catch (error: any) {
            console.log(
                "Aadhar VERIFY ERROR:",
                error?.response?.data || error
            );

            Alert.alert(
                "Verification Failed",
                error?.response?.data?.message ||
                "Something went wrong."
            );

        } finally {
            setLoading(false);
        }
    };

    const handleNavigationChange = (navState: any) => {
        const url = navState.url;

        console.log("WEBVIEW URL:", url);

        // SUCCESS CASE
        if (
            url.includes("success") ||
            url.includes("verified") ||
            url.includes("completed")
        ) {
            setVerificationStatus("success");

            Alert.alert(
                "Verification Successful",
                "Aadhaar verified successfully",
                [
                    {
                        text: "OK",
                        onPress: () => router.back(),
                    },
                ]
            );
        }

        // FAILURE CASE
        if (
            url.includes("failed") ||
            url.includes("failure") ||
            url.includes("cancel")
        ) {
            setVerificationStatus("failed");

            Alert.alert(
                "Verification Failed",
                "Aadhaar verification failed",
                [
                    {
                        text: "OK",
                        onPress: () => router.back(),
                    },
                ]
            );
        }
    };

    // WEBVIEW SCREEN
    if (redirectUrl) {
        return (
            <SafeAreaView style={styles.webContainer}>
                <Header showBackButton />

                <WebView
                    source={{ uri: redirectUrl }}
                    startInLoadingState
                    javaScriptEnabled
                    domStorageEnabled
                    onNavigationStateChange={
                        handleNavigationChange
                    }
                    renderLoading={() => (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator
                                size="large"
                                color="#2563EB"
                            />
                            <Text style={styles.loaderText}>
                                Loading Verification...
                            </Text>
                        </View>
                    )}
                />
            </SafeAreaView>
        );
    }

    // FORM SCREEN
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#F4F7FB"
            />

            <Header showBackButton />

            <View style={styles.container}>
                <View style={styles.heroCard}>
                    <View style={styles.iconWrapper}>
                        <ShieldCheck
                            size={30}
                            color="#2563EB"
                        />
                    </View>

                    <Text style={styles.title}>
                        Aadhaar Verification
                    </Text>

                    <Text style={styles.subtitle}>
                        Verify your Aadhaar securely using
                        DigiLocker authentication.
                    </Text>
                </View>

                <View style={styles.formCard}>
                    <Text style={styles.label}>
                        Name as per Aadhaar
                    </Text>

                    <TextInput
                        value={aadhaarName}
                        onChangeText={setAadhaarName}
                        placeholder="Enter Aadhaar Name"
                        placeholderTextColor="#9CA3AF"
                        style={styles.input}
                    />

                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={[
                            styles.button,
                            loading && styles.disabledButton,
                        ]}
                        onPress={verifyAadhar}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <BadgeCheck
                                    size={18}
                                    color="#fff"
                                />
                                <Text style={styles.buttonText}>
                                    Send Verification Request
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {verificationStatus && (
                        <View
                            style={[
                                styles.statusBox,
                                {
                                    backgroundColor:
                                        verificationStatus ===
                                            "success"
                                            ? "#ECFDF3"
                                            : "#FEF2F2",
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    color:
                                        verificationStatus ===
                                            "success"
                                            ? "#166534"
                                            : "#991B1B",
                                    fontWeight: "700",
                                }}
                            >
                                {verificationStatus ===
                                    "success"
                                    ? "Aadhaar Verified Successfully"
                                    : "Aadhaar Verification Failed"}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F4F7FB",
    },
    container: {
        flex: 1,
        padding: 20,
    },
    heroCard: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
    },
    iconWrapper: {
        width: 62,
        height: 62,
        borderRadius: 18,
        backgroundColor: "#EFF6FF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 24,
        color: "#6B7280",
    },
    formCard: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 22,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        color: "#374151",
        marginBottom: 10,
    },
    input: {
        height: 56,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 15,
        color: "#111827",
        backgroundColor: "#FAFAFA",
        marginBottom: 20,
    },
    button: {
        height: 56,
        backgroundColor: "#2563EB",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },
    webContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loaderText: {
        marginTop: 12,
        fontSize: 14,
        color: "#6B7280",
    },
    statusBox: {
        marginTop: 20,
        padding: 14,
        borderRadius: 14,
        alignItems: "center",
    },
});