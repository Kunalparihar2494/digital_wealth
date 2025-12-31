import AuthBrandHeader from "@/src/components/Auth/AuthBrandHeader";
import AuthCard from "@/src/components/Auth/AuthCard";
import AuthInput from "@/src/components/Auth/AuthInput";
import AuthScreenLayout from "@/src/components/Auth/AuthScreenLayout";
import Button from "@/src/components/shared/Button";
import StepIndicator from "@/src/components/StepIndicator";
import { createAccount, sendOtp, verifyOtp } from "@/src/services/auth";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { Lock, Mail, Phone, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Text,
    TouchableOpacity,
    View
} from "react-native";
export default function Signup() {
    const [step, setStep] = useState(1);
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);


    // Step 1
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");

    // Step 2
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    // Step 3
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [agree, setAgree] = useState(false);
    const [timer, setTimer] = useState(0);
    const [pinError, setPinError] = useState("");
    const [confirmError, setConfirmError] = useState("");

    const nextStep = async () => {
        if (step === 1) {
            if (!mobile || mobile.length !== 10) {
                Alert.alert("Error", "Enter valid 10-digit contact");
                return;
            }
            if (!otp || otp.length < 6) {
                Alert.alert("Error", "Enter valid OTP");
                return;
            }
            try {
                setLoading(true);

                const result = await verifyOtp(mobile, otp);

                if (result?.message) {
                    Alert.alert("Verified", "OTP verified successfully!");
                    setStep(2);
                } else {
                    Alert.alert("Error", result?.message || "Invalid OTP");
                    return;
                }

            } catch (error) {
                console.log("verifyOtp error:", error);
                Alert.alert("Error", "OTP verification failed");
                return;
            } finally {
                setLoading(false);
            }
        }

        if (step === 2) {
            if (!pass1 || pass1.length < 6) {
                Alert.alert("Error", "Password too short");
                return;
            }
            if (pass1 !== pass2) {
                Alert.alert("Error", "Passwords do not match");
                return;
            }
            setStep(3);
        }

        if (step === 3) {
            if (!fullName) {
                Alert.alert("Error", "Full name is required");
                return;
            }

            try {
                setLoading(true);

                const payload = {
                    FullName: fullName,
                    Contact: mobile,
                    Password: pass1,
                    ConfirmPassword: pass2,
                    Email: email,
                    Role: 'Retail'
                };

                const response = await createAccount(payload);

                if (response?.message?.includes("success")) {
                    Alert.alert("Success", "Account created successfully!", [
                        { text: "OK", onPress: () => router.replace("/(auth)/login") }
                    ]);
                } else {
                    Alert.alert("Error", response?.message || "Account creation failed.");
                }

            } catch (err: any) {
                console.log("CreateAccount error:", err?.response?.data);
                Alert.alert(
                    "Error",
                    err?.response?.data?.message || "Something went wrong. Try again."
                );
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSendOtp = async () => {
        if (!mobile || mobile.length !== 10) {
            Alert.alert("Error", "Enter valid mobile number");
            return;
        }

        try {
            const data = await sendOtp(mobile);
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

    useEffect(() => {
        let interval: any = null;

        if (otpSent && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        if (timer === 0) {
            setOtpSent(false);  // enable button again
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [otpSent, timer]);

    const handlePinChange = (text: string) => {
        setPass1(text);

        if (!/^\d*$/.test(text)) {
            setPinError("PIN must contain numbers only");
        }
        else if (text.length !== 6) {
            setPinError("PIN must be exactly 6 digits");
        }
        else {
            setPinError("");
        }
    };

    const handleConfirmPinChange = (text: string) => {
        setPass2(text);

        if (text !== pass1) {
            setConfirmError("PINs do not match");
        } else {
            setConfirmError("");
        }
    };


    return (
        <AuthScreenLayout>
            <AuthCard>
                <AuthBrandHeader />

                <View className="bg-white w-full max-w-sm rounded-3xl px-6 py-8 shadow-lg">
                    <Text className="text-2xl font-semibold text-center mb-6 text-gray-600">
                        Create Account
                    </Text>

                    <StepIndicator step={step} />

                    {/* STEP 1 – Mobile + OTP */}
                    {step === 1 && (
                        <>
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
                            />

                            <Button
                                title={loading ? "Verifying..." : "Verify OTP"}
                                onPress={nextStep}
                                disabled={loading || otp.length !== 6}
                            />
                        </>
                    )}

                    {/* STEP 2 – PIN */}
                    {step === 2 && (
                        <>
                            <AuthInput
                                placeholder="Enter 6-digit PIN"
                                value={pass1}
                                onChangeText={handlePinChange}
                                keyboardType="numeric"
                                secureTextEntry
                                icon={<Lock size={18} color="#6B7280" />}
                            />

                            <AuthInput
                                placeholder="Confirm 6-digit PIN"
                                value={pass2}
                                onChangeText={handleConfirmPinChange}
                                keyboardType="numeric"
                                secureTextEntry
                                icon={<Lock size={18} color="#6B7280" />}
                            />

                            {confirmError ? (
                                <Text className="text-red-500 text-xs mb-2">
                                    {confirmError}
                                </Text>
                            ) : null}

                            <Button
                                title="Next"
                                onPress={nextStep}
                                disabled={pass2.length !== 6}
                            />
                        </>
                    )}

                    {/* STEP 3 – Profile */}
                    {step === 3 && (
                        <>
                            <AuthInput
                                placeholder="Full Name as per Aadhar"
                                value={fullName}
                                onChangeText={setFullName}
                                icon={<User size={18} color="#6B7280" />}
                            />

                            <AuthInput
                                placeholder="Email (Optional)"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                icon={<Mail size={18} color="#6B7280" />}
                            />

                            <Button title="Create Account" onPress={nextStep} />

                            {/* Agreement */}
                            <View className="flex-row items-start mt-4">
                                <Checkbox value={agree} onValueChange={setAgree} />
                                <Text className="ml-3 text-gray-600 text-sm flex-1">
                                    I agree to the
                                    <Text
                                        className="text-emerald-600"
                                        onPress={() => router.push("/privacy")}
                                    >
                                        {" "}Privacy Policy
                                    </Text>,
                                    <Text
                                        className="text-emerald-600"
                                        onPress={() => router.push("/terms")}
                                    >
                                        {" "}Terms & Conditions
                                    </Text>{" "}
                                    and
                                    <Text
                                        className="text-emerald-600"
                                        onPress={() => router.push("/distributor")}
                                    >
                                        {" "}Distributor Agreement
                                    </Text>.
                                </Text>
                            </View>
                        </>
                    )}

                    {/* Footer */}
                    <View className="flex-row justify-center mt-6">
                        <Text className="text-gray-600 text-sm">Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                            <Text className="text-emerald-600 text-sm font-semibold">
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </AuthCard>
        </AuthScreenLayout>
        // <AuthContainer subtitle="Secure access to your investments">
        //     {/* Logo & Branding */}

        //     {/* Card */}
        //     <View className="bg-white w-full max-w-sm rounded-3xl px-6 py-8 shadow-lg">
        //         <Text className="text-2xl font-semibold text-center mb-6 text-gray-600">
        //             Create Account
        //         </Text>

        //         <StepIndicator step={step} />

        //         {/* STEP 1 – Mobile + OTP */}
        //         {step === 1 && (
        //             <>
        //                 <AuthInput
        //                     placeholder="Contact"
        //                     value={mobile}
        //                     onChangeText={setMobile}
        //                     keyboardType="phone-pad"
        //                     icon={<Phone size={18} color="#6B7280" />}
        //                     showOtpButton
        //                     otpSent={otpSent}
        //                     onSendOtp={handleSendOtp}
        //                     timer={timer}
        //                 />

        //                 <AuthInput
        //                     placeholder="Enter OTP"
        //                     value={otp}
        //                     onChangeText={setOtp}
        //                     keyboardType="numeric"
        //                     icon={<Lock size={18} color="#6B7280" />}
        //                 />

        //                 <Button
        //                     title={loading ? "Verifying..." : "Verify OTP"}
        //                     onPress={nextStep}
        //                     disabled={loading || otp.length !== 6}
        //                 />
        //             </>
        //         )}

        //         {/* STEP 2 – PIN */}
        //         {step === 2 && (
        //             <>
        //                 <AuthInput
        //                     placeholder="Enter 6-digit PIN"
        //                     value={pass1}
        //                     onChangeText={handlePinChange}
        //                     keyboardType="numeric"
        //                     secureTextEntry
        //                     icon={<Lock size={18} color="#6B7280" />}
        //                 />

        //                 <AuthInput
        //                     placeholder="Confirm 6-digit PIN"
        //                     value={pass2}
        //                     onChangeText={handleConfirmPinChange}
        //                     keyboardType="numeric"
        //                     secureTextEntry
        //                     icon={<Lock size={18} color="#6B7280" />}
        //                 />

        //                 {confirmError ? (
        //                     <Text className="text-red-500 text-xs mb-2">
        //                         {confirmError}
        //                     </Text>
        //                 ) : null}

        //                 <Button
        //                     title="Next"
        //                     onPress={nextStep}
        //                     disabled={pass2.length !== 6}
        //                 />
        //             </>
        //         )}

        //         {/* STEP 3 – Profile */}
        //         {step === 3 && (
        //             <>
        //                 <AuthInput
        //                     placeholder="Full Name as per Aadhar"
        //                     value={fullName}
        //                     onChangeText={setFullName}
        //                     icon={<User size={18} color="#6B7280" />}
        //                 />

        //                 <AuthInput
        //                     placeholder="Email (Optional)"
        //                     value={email}
        //                     onChangeText={setEmail}
        //                     keyboardType="email-address"
        //                     icon={<Mail size={18} color="#6B7280" />}
        //                 />

        //                 <Button title="Create Account" onPress={nextStep} />

        //                 {/* Agreement */}
        //                 <View className="flex-row items-start mt-4">
        //                     <Checkbox value={agree} onValueChange={setAgree} />
        //                     <Text className="ml-3 text-gray-600 text-sm flex-1">
        //                         I agree to the
        //                         <Text
        //                             className="text-emerald-600"
        //                             onPress={() => router.push("/privacy")}
        //                         >
        //                             {" "}Privacy Policy
        //                         </Text>,
        //                         <Text
        //                             className="text-emerald-600"
        //                             onPress={() => router.push("/terms")}
        //                         >
        //                             {" "}Terms & Conditions
        //                         </Text>{" "}
        //                         and
        //                         <Text
        //                             className="text-emerald-600"
        //                             onPress={() => router.push("/distributor")}
        //                         >
        //                             {" "}Distributor Agreement
        //                         </Text>.
        //                     </Text>
        //                 </View>
        //             </>
        //         )}

        //         {/* Footer */}
        //         <View className="flex-row justify-center mt-6">
        //             <Text className="text-gray-600 text-sm">Already have an account? </Text>
        //             <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
        //                 <Text className="text-emerald-600 text-sm font-semibold">
        //                     Sign in
        //                 </Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        // </AuthContainer>
        //     {/* <View className="flex-1 justify-center items-center bg-primary px-5"> */}
        //     {/* Logo */}
        //     <Image
        //         source={require('@/assets/images/loggraphics3.png')}
        //         className="w-100 h-20 mb-4"
        //         resizeMode="contain"
        //     />
        //     <View className='mb-10'>
        //         <Text className='text-5xl text-white '>Digital Wealth</Text>
        //     </View>
        //     <View className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-md mt-2">
        //         <Text className="text-2xl font-bold text-center mb-8">
        //             Create Account
        //         </Text>
        //         <StepIndicator step={step} />
        //         {step === 1 && (
        //             <>
        //                 <InputField
        //                     placeholder="Enter Mobile Number"
        //                     numeric
        //                     icon={<Text>📞</Text>}
        //                     value={mobile}
        //                     onChangeText={setMobile}
        //                     showOtpButton={true}
        //                     otpSent={otpSent}
        //                     onSendOtp={handleSendOtp}
        //                     timer={timer}
        //                 />
        //                 <InputField
        //                     placeholder="Enter OTP"
        //                     numeric
        //                     icon={<Text>🔐</Text>}
        //                     value={otp}
        //                     onChangeText={setOtp}
        //                 />
        //                 <Button title={loading ? "Verifying..." : "Verify OTP"}
        //                     onPress={nextStep}
        //                     disabled={loading || otp.length !== 6} />
        //             </>
        //         )}

        //         {step === 2 && (
        //             <>
        //                 <InputField
        //                     icon={<Text>🔐</Text>}
        //                     placeholder="Enter 6-digit PIN"
        //                     secureTextEntry
        //                     numeric
        //                     value={pass1}
        //                     onChangeText={handlePinChange}
        //                 />
        //                 <InputField
        //                     icon={<Text>🔐</Text>}
        //                     placeholder="Confirm 6-digit PIN"
        //                     secureTextEntry
        //                     numeric
        //                     value={pass2}
        //                     onChangeText={handleConfirmPinChange}
        //                 />
        //                 {confirmError ? <Text className="text-red-500 text-xs">{confirmError}</Text> : null}
        //                 <Button title="Next" onPress={nextStep} disabled={pass2.length !== 6} />
        //             </>
        //         )}

        //         {step === 3 && (
        //             <>
        //                 <InputField
        //                     icon={<Text>👤</Text>}
        //                     placeholder="Full Name as per Aadhar"
        //                     value={fullName}
        //                     onChangeText={setFullName}
        //                 />
        //                 <InputField
        //                     icon={<Text>✉️</Text>}
        //                     placeholder="Email (Optional)"
        //                     value={email}
        //                     onChangeText={setEmail}
        //                 />
        //                 <Button title="Create Account" onPress={nextStep} />
        //             </>
        //         )}
        //         <View>
        //         </View>
        //         {
        //             step === 3 &&
        //             <View className="flex-row items-center mt-3 w-80">
        //                 <Checkbox value={agree} onValueChange={setAgree} />
        //                 <Text className="ml-3 text-gray-600 text-sm">
        //                     I agree to the
        //                     <Text onPress={() => router.push("/privacy")}> Privacy Policy</Text>,
        //                     <Text onPress={() => router.push("/terms")}> Terms & Conditions </Text>
        //                     and <Text onPress={() => router.push("/distributor")}> Distributor Agreement</Text>.
        //                 </Text>
        //             </View>
        //         }


        //         <View className="flex-row justify-center mt-6">
        //             <Text className="text-gray-700">Already have an account? </Text>
        //             <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
        //                 <Text className="text-blue-600 font-semibold">Sign in</Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        //     {/* </View> */}
        // </AuthContainer>
    );
}
