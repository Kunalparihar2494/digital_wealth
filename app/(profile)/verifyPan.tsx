import Header from "@/src/components/shared/Header";
import api from "@/src/services/api";
import { BadgeCheck, IdCard } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";


export default function PanVerifyScreen() {
    const [name, setName] = useState("");
    const [pan, setPan] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | boolean>(null);

    const isButtonDisabled = useMemo(() => {
        return !name || pan.length !== 10 || loading;
    }, [name, pan, loading]);

    const verifyPan = async () => {
        if (!name || !pan) {
            Alert.alert("Validation", "Please enter all details");
            return;
        }

        // PAN format validation
        const isValidPan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(
            pan.toUpperCase()
        );

        if (!isValidPan) {
            Alert.alert(
                "Invalid PAN",
                "Please enter a valid PAN number"
            );
            return;
        }

        try {
            setLoading(true);
            setResult(null);

            const payload = {
                pan: pan.toUpperCase(),
            };

            const res = await api.post(
                "/AppAccess/verify-pan",
                payload
            );

            console.log("PAN VERIFY RESPONSE:", res.data);

            // Backend success handling
            const isSuccess =
                res?.data?.success === true ||
                res?.data?.status === true ||
                res?.data?.verified === true;

            setResult(isSuccess);

            if (!isSuccess) {
                Alert.alert(
                    "Verification Failed",
                    res?.data?.message ||
                    "PAN verification failed"
                );
            }

        } catch (error: any) {
            console.log(
                "PAN VERIFY ERROR:",
                error?.response?.data || error
            );

            setResult(false);

            Alert.alert(
                "Verification Failed",
                error?.response?.data?.message ||
                "Something went wrong."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Header showBackButton />
            <StatusBar barStyle="dark-content" backgroundColor="#F4F7FB" />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 40,
                    flexGrow: 1,
                    justifyContent: "center",   // 🔥 REQUIRED
                }}
                className="bg-white"
            >
                <View style={styles.heroCard}>
                    <View style={styles.iconWrapper}>
                        <IdCard size={30} color="#2563EB" />
                    </View>

                    <Text style={styles.title}>PAN Verification</Text>

                    <Text style={styles.subtitle}>
                        Verify your PAN details securely to continue using all platform
                        features.
                    </Text>
                </View>
                <View style={styles.formCard}>
                    <Text style={styles.label}>Full Name</Text>

                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your full name"
                        placeholderTextColor="#9CA3AF"
                        style={styles.input}
                    />

                    <Text style={styles.label}>PAN Number</Text>
                    <TextInput
                        value={pan}
                        onChangeText={(text) =>
                            setPan(text.toUpperCase().replace(/[^A-Z0-9]/g, ""))
                        }
                        placeholder="ABCDE1234F"
                        placeholderTextColor="#9CA3AF"
                        autoCapitalize="characters"
                        maxLength={10}
                        style={styles.input}
                    />

                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={[
                            styles.button,
                            isButtonDisabled && styles.disabledButton,
                        ]}
                        onPress={verifyPan}
                        disabled={isButtonDisabled}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <BadgeCheck size={18} color="#fff" />
                                <Text style={styles.buttonText}>Verify PAN</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {result !== null && (
                        <View
                            style={[
                                styles.resultContainer,
                                {
                                    backgroundColor: result ? "#ECFDF3" : "#FEF2F2",
                                    borderColor: result ? "#ABEFC6" : "#FECACA",
                                },
                            ]}
                        >
                            <View
                                style={[
                                    styles.resultDot,
                                    {
                                        backgroundColor: result ? "#16A34A" : "#DC2626",
                                    },
                                ]}
                            />

                            <View style={{ flex: 1 }}>
                                <Text
                                    style={[
                                        styles.resultTitle,
                                        {
                                            color: result ? "#166534" : "#991B1B",
                                        },
                                    ]}
                                >
                                    {result
                                        ? "PAN Verified Successfully"
                                        : "PAN Verification Failed"}
                                </Text>

                                <Text style={styles.resultDescription}>
                                    {result
                                        ? "Your PAN details have been successfully verified."
                                        : "Please check your PAN details and try again."}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        // <>
        //     <Header />
        //     <StatusBar barStyle="dark-content" backgroundColor="#F4F7FB" />

        //     <KeyboardAvoidingView
        //         style={{ flex: 1 }}
        //         behavior={Platform.OS === "ios" ? "padding" : undefined}
        //     >
        //         <ScrollView
        //             contentContainerStyle={styles.container}
        //             keyboardShouldPersistTaps="handled"
        //             showsVerticalScrollIndicator={false}
        //         >
        //             <View style={styles.heroCard}>
        //                 <View style={styles.iconWrapper}>
        //                     <IdCard size={30} color="#2563EB" />
        //                 </View>

        //                 <Text style={styles.title}>PAN Verification</Text>

        //                 <Text style={styles.subtitle}>
        //                     Verify your PAN details securely to continue using all platform
        //                     features.
        //                 </Text>
        //             </View>

        //             <View style={styles.formCard}>
        //                 <Text style={styles.label}>Full Name</Text>

        //                 <TextInput
        //                     value={name}
        //                     onChangeText={setName}
        //                     placeholder="Enter your full name"
        //                     placeholderTextColor="#9CA3AF"
        //                     style={styles.input}
        //                 />

        //                 <Text style={styles.label}>PAN Number</Text>

        //                 <TextInput
        //                     value={pan}
        //                     onChangeText={(text) =>
        //                         setPan(text.toUpperCase().replace(/[^A-Z0-9]/g, ""))
        //                     }
        //                     placeholder="ABCDE1234F"
        //                     placeholderTextColor="#9CA3AF"
        //                     autoCapitalize="characters"
        //                     maxLength={10}
        //                     style={styles.input}
        //                 />

        //                 <TouchableOpacity
        //                     activeOpacity={0.85}
        //                     style={[
        //                         styles.button,
        //                         isButtonDisabled && styles.disabledButton,
        //                     ]}
        //                     onPress={verifyPan}
        //                     disabled={isButtonDisabled}
        //                 >
        //                     {loading ? (
        //                         <ActivityIndicator color="#fff" />
        //                     ) : (
        //                         <>
        //                             <BadgeCheck size={18} color="#fff" />
        //                             <Text style={styles.buttonText}>Verify PAN</Text>
        //                         </>
        //                     )}
        //                 </TouchableOpacity>

        //                 {result !== null && (
        //                     <View
        //                         style={[
        //                             styles.resultContainer,
        //                             {
        //                                 backgroundColor: result ? "#ECFDF3" : "#FEF2F2",
        //                                 borderColor: result ? "#ABEFC6" : "#FECACA",
        //                             },
        //                         ]}
        //                     >
        //                         <View
        //                             style={[
        //                                 styles.resultDot,
        //                                 {
        //                                     backgroundColor: result ? "#16A34A" : "#DC2626",
        //                                 },
        //                             ]}
        //                         />

        //                         <View style={{ flex: 1 }}>
        //                             <Text
        //                                 style={[
        //                                     styles.resultTitle,
        //                                     {
        //                                         color: result ? "#166534" : "#991B1B",
        //                                     },
        //                                 ]}
        //                             >
        //                                 {result
        //                                     ? "PAN Verified Successfully"
        //                                     : "PAN Verification Failed"}
        //                             </Text>

        //                             <Text style={styles.resultDescription}>
        //                                 {result
        //                                     ? "Your PAN details have been successfully verified."
        //                                     : "Please check your PAN details and try again."}
        //                             </Text>
        //                         </View>
        //                     </View>
        //                 )}
        //             </View>
        //         </ScrollView>
        //     </KeyboardAvoidingView>
        // </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F4F7FB",
    },
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    heroCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 3,
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
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 22,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 3,
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
        marginTop: 6,
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
    resultContainer: {
        marginTop: 24,
        borderWidth: 1,
        borderRadius: 18,
        padding: 18,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
    },
    resultDot: {
        width: 12,
        height: 12,
        borderRadius: 999,
        marginTop: 6,
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: "800",
        marginBottom: 4,
    },
    resultDescription: {
        fontSize: 14,
        lineHeight: 22,
        color: "#6B7280",
    },
});