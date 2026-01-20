import AuthBrandHeader from '@/src/components/Auth/AuthBrandHeader';
import AuthCard from '@/src/components/Auth/AuthCard';
import AuthInput from '@/src/components/Auth/AuthInput';
import AuthScreenLayout from '@/src/components/Auth/AuthScreenLayout';
import PrimaryButton from '@/src/components/PrimaryButton';
import { IForgotPassword } from '@/src/model/auth.interface';
import { ForgetPasswordOTP, ForgotPasswordApi } from '@/src/services/auth';
import { router } from 'expo-router';
import { Lock, Phone } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert, Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function ForgotPasswordScreen() {
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);

    // Step 1
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [newPass, setNewPass] = useState("");

    const handleSendOtp = async () => {
        if (!mobile || mobile.length !== 10) {
            Alert.alert("Error", "Enter valid mobile number");
            return;
        }

        try {
            const data = await ForgetPasswordOTP(mobile);
            if (data) {
                setOtpSent(true);
                setTimer(120);
                Alert.alert("OTP Sent!", "Please check your phone");
            } else {
                Alert.alert(data.message);
            }

        } catch (error: any) {
            console.log("OTP API error:", error?.response?.data);

            // backend is sending success message inside 500 error
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                "OTP sending failed.";

            Alert.alert("Info", msg);

            // If backend still returned useful message, enable OTP timer
            if (error?.response?.data?.message?.includes("Successfully")) {
                setOtpSent(true);
                setTimer(120);
            }
        }

    };

    const handleChangePassword = async () => {
        if (!otp) {
            Alert.alert("Error", "OTP is required");
            return;
        }
        if (!newPass) {
            Alert.alert("Error", "Password is required");
            return;
        }

        try {
            setLoading(true);

            const payload: IForgotPassword = {
                contact: mobile,
                password: newPass,
                OTP: otp
            };

            const response = await ForgotPasswordApi(payload);

            if (response?.message?.includes("success")) {
                Alert.alert("Success", "Password changed successfully!", [
                    { text: "OK", onPress: () => router.replace("/(auth)/login") }
                ]);
            } else {
                Alert.alert("Error", response?.message || "Password creation failed.");
            }

        } catch (err: any) {
            console.log("Password change error:", err?.response?.data);
            Alert.alert(
                "Error",
                err?.response?.data?.message || "Something went wrong. Try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthScreenLayout>
            <AuthCard>
                <AuthBrandHeader />
                <Text className="text-2xl font-semibold text-center mb-4 text-gray-600">
                    Forgot Password
                </Text>
                <AuthInput
                    placeholder="Contact"
                    value={mobile}
                    onChangeText={setMobile}
                    keyboardType="phone-pad"
                    icon={<Phone size={18} color="#6B7280" />}
                    showOtpButton
                    otpSent={otpSent}
                    onSendOtp={handleSendOtp}
                    timer={timer}
                />

                <AuthInput
                    placeholder="Enter OTP"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="numeric"
                    icon={<Lock size={18} color="#6B7280" />}
                    maxLength={6}
                />

                <AuthInput
                    placeholder="Enter New Password"
                    value={newPass}
                    onChangeText={setNewPass}
                    keyboardType="numeric"
                    icon={<Lock size={18} color="#6B7280" />}
                    maxLength={6}
                />



                <PrimaryButton title="Change Password" onPress={handleChangePassword} />
                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-600 text-sm">Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                        <Text className="text-emerald-600 text-sm font-semibold">
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </AuthCard>
        </AuthScreenLayout>

    );
}