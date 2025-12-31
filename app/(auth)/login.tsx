import AuthBottomText from "@/src/components/Auth/AuthBottomText";
import AuthBrandHeader from "@/src/components/Auth/AuthBrandHeader";
import AuthCard from "@/src/components/Auth/AuthCard";
import AuthFooterActions from "@/src/components/Auth/AuthFooter";
import AuthInput from "@/src/components/Auth/AuthInput";
import AuthScreenLayout from "@/src/components/Auth/AuthScreenLayout";
import PrimaryButton from "@/src/components/PrimaryButton";
import { IUser } from "@/src/model/auth.interface";
import { loginUser } from "@/src/services/auth";
import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { Lock, Phone } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
    const [contact, setContact] = useState("");
    const [pin, setPin] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false);
    const { setAuth } = useAuthStore();
    const { setUser } = useUserStore();

    const handleLogin = async () => {
        if (!contact || !pin) {
            Alert.alert("Error", "Please enter mobile number and password");
            return;
        }
        setLoading(true);
        try {
            const data: IUser = await loginUser({ contact, pin });

            if (data?.success || data?.token) {
                await setAuth(data.token);
                await setUser(data.user);
                router.replace("/(tabs)/home");
            } else {
                Alert.alert("Login Failed", data?.message || "Invalid credentials");
            }
        } catch (err: any) {
            console.log(err);
            Alert.alert("Error", "Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
                {/* You can add color by: <ActivityIndicator size="large" color="#000" /> */}
            </View>
        );
    }

    return (
        <AuthScreenLayout>
            <AuthCard>
                <AuthBrandHeader />

                <AuthInput
                    placeholder="Mobile No."
                    keyboardType="phone-pad"
                    icon={<Phone size={18} color="#6B7280" />}
                    value={contact}
                    onChangeText={setContact}
                    maxLength={10}
                />

                <AuthInput
                    placeholder="Password"
                    secureTextEntry
                    keyboardType="numeric"
                    icon={<Lock size={18} color="#6B7280" />}
                    value={pin}
                    onChangeText={setPin}
                    maxLength={6}
                />


                <View className="flex-row justify-between items-center mb-4">
                    <View className="flex-row items-center">
                        <Checkbox
                            value={remember}
                            onValueChange={setRemember}
                            color={remember ? "#059669" : undefined}
                        />
                        <Text className="ml-2 text-sm text-gray-600">Remember me</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.replace("/(auth)/forgotPassword")}>
                        <Text className="text-sm text-emerald-600">Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <PrimaryButton title="Sign In" onPress={handleLogin} />

                <AuthFooterActions />
                <AuthBottomText />
            </AuthCard>
        </AuthScreenLayout>
        // <AuthLayout
        //     subtitle="Secure access to your investments"
        // >
        //     <AuthInput
        //         placeholder="Contact or Phone Number"
        //         value={contact}
        //         keyboardType="phone-pad"
        //         onChangeText={setContact}
        //         icon={<User size={18} color="#6B7280" />}
        //     />

        //     <AuthInput
        //         placeholder="Enter Pin"
        //         value={pin}
        //         keyboardType="numeric"
        //         onChangeText={setPin}
        //         secureTextEntry={true}
        //         maxLength={6}
        //         icon={<Lock size={18} color="#6B7280" />}
        //     />

        //     <View className="flex-row justify-between items-center mb-4">
        //         <View className="flex-row items-center">
        //             <Checkbox
        //                 value={remember}
        //                 onValueChange={setRemember}
        //                 color={remember ? "#318029" : undefined}
        //             />
        //             <Text className="ml-2 text-sm text-gray-600">Remember me</Text>
        //         </View>
        //         <TouchableOpacity
        //             onPress={() => router.replace("/(auth)/forgotPassword")}>
        //             <Text className="text-sm text-emerald-600">Forgot Password?</Text>
        //         </TouchableOpacity>
        //     </View>

        //     <PrimaryButton title="Sign In" onPress={handleLogin} />

        //     <View className="my-4">
        //         <View className="flex-row items-center mb-2">
        //             <View className="flex-1 h-px bg-gray-300" />
        //             <Text className="mx-3 text-gray-500 text-sm">Or continue with</Text>
        //             <View className="flex-1 h-px bg-gray-300" />
        //         </View>

        //         <View className="flex-row justify-center gap-4 mt-6">
        //             {/* GOOGLE */}
        //             <SocialAuthButton
        //                 label=""
        //                 icon={
        //                     <Image
        //                         source={require('@/assets/images/google.png')}
        //                         style={{ width: 18, height: 18 }}
        //                         resizeMode="contain"
        //                     />
        //                 }
        //                 onPress={() => console.log("Google Login")}
        //             />

        //             {/* BIOMETRIC */}
        //             <SocialAuthButton
        //                 label="Biometric"
        //                 icon={<Fingerprint size={18} color="#374151" />}
        //                 onPress={() => console.log("Biometric Login")}
        //             />
        //         </View>
        //     </View>

        //     <View className="flex-row justify-center mt-5">
        //         <Text className="text-gray-500 text-sm mt-1 text-center">Don’t have an account? </Text>
        //         <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
        //             <Text className="text-emerald-600 text-sm mt-1 font-semibold">Sign Up</Text>
        //         </TouchableOpacity>
        //     </View>
        // </AuthLayout>
        // <AuthContainer>
        //     {/* // <View className="flex-1 justify-center items-center bg-primary px-5"> */}
        //     {/* Logo */}
        //     <Image
        //         source={require('@/assets/images/loggraphics3.png')}
        //         className="w-100 h-20 mb-4"
        //         resizeMode="contain"
        //     />
        //     <View className='my-10'>
        //         <Text className='text-5xl text-gray-500 '>Digital Wealth</Text>
        //     </View>

        //     {/* Card */}
        //     {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        //     <View className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-md mt-2">
        //         <Text className="text-2xl font-semibold text-gray-900 mb-6">
        //             Sign In
        //         </Text>

        //         {/* Contact Number */}
        //         {/* <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-gray-50">
        //             <Text className="text-gray-400 mr-2">📞</Text>
        //             <TextInput
        //                 placeholder="Contact Number"
        //                 value={contact}
        //                 onChangeText={setContact}
        //                 keyboardType="phone-pad"
        //                 className="flex-1 text-gray-700"
        //                 placeholderTextColor="#999"
        //                 maxLength={10}
        //             />
        //         </View> */}
        //         <View className="mb-4">
        //             <Text className="text-sm text-gray-700 mb-1">
        //                 Username
        //             </Text>
        //             <TextInput
        //                 placeholder="Contact Number"
        //                 value={contact}
        //                 onChangeText={setContact}
        //                 keyboardType="phone-pad"
        //                 maxLength={10}
        //                 placeholderTextColor="#9CA3AF"
        //                 className="border border-gray-300 rounded-md px-3 py-2 text-gray-900"
        //             />
        //         </View>

        //         {/* PIN */}
        //         {/* <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 mb-6 bg-gray-50">
        //             <Text className="text-gray-400 mr-2">🔒</Text>
        //             <TextInput
        //                 placeholder="6-Digit PIN"
        //                 value={pin}
        //                 onChangeText={setPin}
        //                 secureTextEntry={showPassword}
        //                 keyboardType="numeric"
        //                 className="flex-1 text-gray-700"
        //                 placeholderTextColor="#999"
        //                 maxLength={6}
        //             />
        //             <Text onPress={handleEye} className="text-gray-400 ml-2">👁️</Text>
        //         </View> */}
        //         <View className="mb-4">
        //             <Text className="text-sm text-gray-700 mb-1">
        //                 Password
        //             </Text>
        //             <View className="flex-row items-center border border-gray-300 rounded-md px-3">
        //                 <TextInput
        //                     value={pin}
        //                     onChangeText={setPin}
        //                     keyboardType="numeric"
        //                     maxLength={6}
        //                     secureTextEntry={!showPassword}
        //                     placeholder="••••••••"
        //                     placeholderTextColor="#9CA3AF"
        //                     className="flex-1 py-2 text-gray-900"
        //                 />
        //                 <TouchableOpacity
        //                     onPress={() => setShowPassword(!showPassword)}
        //                 >
        //                     {showPassword ? (
        //                         <EyeOff size={18} color="#6B7280" />
        //                     ) : (
        //                         <Eye size={18} color="#6B7280" />
        //                     )}
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //         {/* Remember Me */}
        //         <View className="flex-row items-center mb-6">
        //             <Checkbox
        //                 value={remember}
        //                 onValueChange={setRemember}
        //                 color={remember ? "#6366F1" : undefined}
        //             />
        //             <Text className="ml-2 text-gray-700 text-sm">
        //                 Remember me
        //             </Text>
        //         </View>
        //         {/* Login Button */}
        //         {/* <TouchableOpacity onPress={handleLogin} className="bg-secondary py-3 rounded-full">
        //             <Text className="text-white text-center text-lg font-medium">
        //                 Login
        //             </Text>
        //         </TouchableOpacity> */}
        //         <TouchableOpacity
        //             onPress={handleLogin}
        //             disabled={loading}
        //             className="bg-indigo-500 py-3 rounded-md"
        //         >
        //             {loading ? (
        //                 <ActivityIndicator color="#fff" />
        //             ) : (
        //                 <Text className="text-white text-center font-semibold">
        //                     Login
        //                 </Text>
        //             )}
        //         </TouchableOpacity>

        //         {/* Forgot Password */}
        //         <TouchableOpacity
        //             onPress={() => router.replace("/(auth)/forgotPassword")}
        //         >
        //             <Text className="text-primary text-center mt-3 text-sm">
        //                 Forgot Password?
        //             </Text>
        //         </TouchableOpacity>

        //         {/* Create Account */}
        //         <View className="flex-row justify-center mt-4">
        //             <Text className="text-gray-600">Don’t have an account? </Text>
        //             <TouchableOpacity
        //                 // onPress={() => Linking.openURL("https://digitalwealth.in/Auth/Home")}
        //                 onPress={() => router.replace("/(auth)/signup")}
        //             >
        //                 <Text className="text-primary font-medium">Create One</Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        //     {/* </ScrollView> */}
        //     {/* // </View> */}
        // </AuthContainer>
    );
}
