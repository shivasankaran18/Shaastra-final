import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {  Mail, ArrowRight } from "lucide-react";
import { useOTP } from "@/hooks/use-otp";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export function OTPVerification() {
  const [sp,]=useSearchParams();
  const { otp, handleOTPChange, verifyOTP, resendOTP } = useOTP(sp.get('userid')|| "",sp.get("email") ||"");
  
  useEffect(()=>{
    async function fn() {

      await axios.post(`${BACKEND_URL}/api/user/sendotp`,{
        userId:sp.get("userid"),
        email:sp.get("email")
      })
      
    }
    fn();


  },[])

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto p-6"
      >
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8">
          <div className="flex justify-center mb-8">
            <div className="p-3 rounded-full bg-purple-500/10">
              <Mail className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Verify Your Email
          </h2>
          
          <p className="text-muted-foreground text-center mb-8">
            We've sent a verification code to your email address
          </p>

          <div className="space-y-6">
            <div className="flex gap-2 justify-center">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otp[index] || ''}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-lg font-semibold bg-background/50"
                />
              ))}
            </div>

            <Button 
              variant="secondary" 
              className="w-full group"
              onClick={verifyOTP}
            >
              Verify Email
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="text-center">
              <button
                onClick={resendOTP}
                className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
              >
                Didn't receive the code? Resend
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
