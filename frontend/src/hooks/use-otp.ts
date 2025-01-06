import { BACKEND_URL } from '@/config';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useOTP(userid:string,email:string) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const navigate=useNavigate();

  const handleOTPChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      const nextInput = document.querySelector(
        `input[name=otp-${index + 1}]`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const verifyOTP = async() => {
    try{
      const otpValue = otp.join('');
    console.log(otpValue +" "+userid)
    const res=await axios.post(`${BACKEND_URL}/api/user/verifyotp`,{
      userId:userid,
      otp,
      email
    });
    localStorage.setItem("usertoken",res.data.token);
    navigate('/home');
    console.log('Verifying OTP:', otpValue);
    }
    catch{
      alert('error');
      navigate("/signup")
    }
    
  };

  const resendOTP = () => {
    // Implement your OTP resend logic here
    console.log('Resending OTP');
    setOtp(new Array(6).fill(''));
  };

  return {
    otp,
    handleOTPChange,
    verifyOTP,
    resendOTP,
  };
}
