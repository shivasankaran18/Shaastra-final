// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
// import { BACKEND_URL } from "@/config"; // Adjust the import if necessary

// export function OTPVerification({ route }) {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const { userid, email } = route.params;

//   const handleOTPChange = (index, value) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//   };

//   const verifyOTP = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${BACKEND_URL}/api/user/verifyotp`, {
//         userId: userid,
//         email: email,
//         otp: otp.join(""),
//       });
//       console.log("OTP verified successfully", response.data);
//       // Handle successful OTP verification (navigate to the next screen or show success)
//     } catch (err) {
//       console.error("OTP verification failed", err);
//       // Handle error (show an error message)
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resendOTP = async () => {
//     setLoading(true);
//     try {
//       await axios.post(`${BACKEND_URL}/api/user/sendotp`, {
//         userId: userid,
//         email: email,
//       });
//       console.log("OTP resent successfully");
//     } catch (err) {
//       console.error("Failed to resend OTP", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const sendOtp = async () => {
//       await axios.post(`${BACKEND_URL}/api/user/sendotp`, {
//         userId: userid,
//         email: email,
//       });
//     };
//     sendOtp();
//   }, [userid, email]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <View style={styles.iconContainer}>
//           <Ionicons name="mail" size={32} color="#7C3AED" />
//         </View>
//         <Text style={styles.title}>Verify Your Email</Text>
//         <Text style={styles.subtitle}>We've sent a verification code to your email address</Text>

//         <View style={styles.otpInputContainer}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <TextInput
//               key={index}
//               style={styles.otpInput}
//               maxLength={1}
//               keyboardType="numeric"
//               value={otp[index]}
//               onChangeText={(value) => handleOTPChange(index, value)}
//             />
//           ))}
//         </View>

//         <TouchableOpacity style={styles.button} onPress={verifyOTP} disabled={loading}>
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Verify Email</Text>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity onPress={resendOTP} style={styles.resendButton}>
//           <Text style={styles.resendText}>Didn't receive the code? Resend</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f0f0f5",
//   },
//   card: {
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   iconContainer: {
//     marginBottom: 20,
//     backgroundColor: "#f3f4f7",
//     padding: 15,
//     borderRadius: 50,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#7C3AED",
//     marginBottom: 10,
//   },
//   subtitle: {
//     color: "#888",
//     marginBottom: 30,
//     textAlign: "center",
//   },
//   otpInputContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "80%",
//     marginBottom: 30,
//   },
//   otpInput: {
//     width: 50,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     textAlign: "center",
//     fontSize: 20,
//     borderRadius: 10,
//   },
//   button: {
//     width: "100%",
//     backgroundColor: "#7C3AED",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   resendButton: {
//     marginTop: 10,
//   },
//   resendText: {
//     color: "#7C3AED",
//     fontSize: 14,
//   },
// });
