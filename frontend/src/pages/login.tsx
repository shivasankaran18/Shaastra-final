import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BACKEND_URL } from "@/config"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export function LoginPage() {
   const [email,setEmail]=useState<string>("");
   const [password,setPassword]=useState<string>("");
   const navigate=useNavigate();
   const handleSubmit=async()=>{
      try{
         const res=await axios.post(`${BACKEND_URL}/api/user/login`,{
         email,
         password
      })
         localStorage.setItem("usertoken",res.data.token)
         navigate("/home");

      }
      catch{

         alert("error")
      }
      


   }



   return (
      <div className="min-h-screen flex items-center justify-center bg-black">
         <Card className="w-full max-w-md bg-gray-900 text-white">
            <CardHeader>
               <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Login
               </CardTitle>
               <CardDescription className="text-gray-400">Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <form >
               <CardContent className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="email" className="text-gray-300">Email</Label>
                     <Input
                        id="email"
                        name="email"
                        type="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="password" className="text-gray-300">Password</Label>
                     <Input
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        className="bg-gray-800 border-gray-700 text-white"
                     />
                  </div>
               </CardContent>
               <CardFooter>
                  <Button type="submit" onClick={handleSubmit}className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
                     Sign In
                  </Button>
               </CardFooter>
            </form>
         </Card>
      </div>
   )
}

