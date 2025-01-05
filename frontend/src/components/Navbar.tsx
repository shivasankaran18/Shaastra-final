import { motion } from "framer-motion";
import {Link, useNavigate} from "react-router-dom"
import { Button } from "./ui/button";
import { Shield } from "lucide-react";

export function Navbar() {
  const navigate=useNavigate()
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-purple-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            LendSure
          </span>
        </div>
        
       

        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/login")} size="sm">Log in</Button>
          <Button variant="secondary" size="sm" onClick={() => navigate("/signup")}>Sign-up</Button>
        </div>
      </div>
    </motion.nav>
  );
}
