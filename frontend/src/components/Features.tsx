import { motion } from "framer-motion";
import { Activity, Database, Lock, MessageSquare, Smartphone, Users } from "lucide-react";

const features = [
  {
    icon: <Database className="w-6 h-6" />,
    title: "NPCI Integration",
    description: "Secure access to transaction data for comprehensive financial analysis"
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Real-time Analysis",
    description: "Instant credit assessment using advanced machine learning algorithms"
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Social Insights",
    description: "Alternative data analysis from social media activity and behavior"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Utility Payments",
    description: "Track record of regular payments and financial responsibility"
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Secure & Private",
    description: "Bank-grade security with encrypted data transmission"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Fair Assessment",
    description: "Inclusive credit scoring for all types of borrowers"
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Comprehensive Credit Assessment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform leverages multiple data sources to provide accurate and fair credit risk assessment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
