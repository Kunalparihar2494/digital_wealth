import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
    TextInput,
} from "react-native";
import { Phone } from "lucide-react-native";
import { router } from "expo-router";
import InputField from "../../src/components/InputField";
import Button from "../../src/components/Button";
import StepIndicator from "@/src/components/StepIndicator";

export default function Signup() {
    const [step, setStep] = useState(1);
    const [otpSent, setOtpSent] = useState(false);


    // Step 1
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");

    // Step 2
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    // Step 3
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const nextStep = () => {
        if (step === 1) {
            if (!mobile || mobile.length !== 10) {
                Alert.alert("Error", "Enter valid 10-digit contact");
                return;
            }
            if (!otp || otp.length < 4) {
                Alert.alert("Error", "Enter valid OTP");
                return;
            }
            setStep(2);
        }

        if (step === 2) {
            if (!pass1 || pass1.length < 4) {
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

            Alert.alert("Success", "Account created successfully!");
            router.replace("/(auth)/login");
        }
    };

    const sendOtp = () => {
        if (!mobile || mobile.length !== 10) {
            Alert.alert("Error", "Enter valid mobile number");
            return;
        }

        setOtpSent(true);
        Alert.alert("OTP Sent!", "Please check your phone");
    };


    return (
        <View className="flex-1 justify-center items-center bg-primary px-5">
            {/* Logo */}
            <Image
                source={require('@/assets/images/loggraphics3.png')}
                className="w-100 h-20 mb-4"
                resizeMode="contain"
            />
            <View className='mb-10'>
                <Text className='text-5xl text-white '>Digital Wealth</Text>
            </View>
            <View className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-md mt-2">
                <Text className="text-2xl font-bold text-center mb-8">
                    Create Account
                </Text>
                <StepIndicator step={step} />
                {step === 1 && (
                    <>
                        <InputField
                            placeholder="Enter Mobile Number"
                            numeric
                            icon={<Text>📞</Text>}
                            value={mobile}
                            onChangeText={setMobile}
                            showOtpButton={true}
                            otpSent={otpSent}
                            onSendOtp={sendOtp}

                        />
                        <InputField
                            placeholder="Enter OTP"
                            numeric
                            icon={<Text>🔐</Text>}
                            value={otp}
                            onChangeText={setOtp}
                        />
                        <Button title="Verify OTP" onPress={nextStep} />
                    </>
                )}

                {step === 2 && (
                    <>
                        <InputField
                            icon={<Text>🔐</Text>}
                            placeholder="Enter Password"
                            secureTextEntry
                            value={pass1}
                            onChangeText={setPass1}
                        />
                        <InputField
                            icon={<Text>🔐</Text>}
                            placeholder="Confirm Password"
                            secureTextEntry
                            value={pass2}
                            onChangeText={setPass2}
                        />
                        <Button title="Next" onPress={nextStep} />
                    </>
                )}

                {step === 3 && (
                    <>
                        <InputField
                            icon={<Text>👤</Text>}
                            placeholder="Full Name as per Aadhar"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                        <InputField
                            icon={<Text>✉️</Text>}
                            placeholder="Email (Optional)"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Button title="Create Account" onPress={nextStep} />
                    </>
                )}
                <View>
                </View>
                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-700">Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                        <Text className="text-blue-600 font-semibold">Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
