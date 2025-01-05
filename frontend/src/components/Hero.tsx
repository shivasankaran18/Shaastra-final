import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Shield } from "lucide-react";

export function Hero() {
  return (
    <div className="relative w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
      
      <div className="container mx-auto px-4 pt-20 relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <Shield className="w-8 h-8 text-purple-500" />
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
              Innovative Credit Risk Assessment
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
          >
            Smart Lending Decisions with Alternative Data
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Unlock financial opportunities with our AI-powered credit assessment platform.
            We analyze alternative data sources to provide fair and accurate creditworthiness scores.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button variant="secondary" size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
