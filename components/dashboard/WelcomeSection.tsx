"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface WelcomeSectionProps {
  user?: { name: string; email: string } | null;
}

export default function WelcomeSection({ user: propUser }: WelcomeSectionProps) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (propUser) {
      setUser(propUser);
      setIsLoading(false);
    } else {
      const userData = localStorage.getItem("user_data");
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
      setIsLoading(false);
    }
  }, [propUser]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  const getUserName = () => {
    if (!user) return "Athlete";
    const name = user.name || user.email.split("@")[0] || "Athlete";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  if (isLoading) {
    return (
      <div className="relative z-10 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20 mb-12 overflow-hidden animate-pulse">
        <div className="space-y-4 relative z-10 flex-1">
          <div className="inline-block w-32 h-6 bg-primary/20 rounded-full"></div>
          <div>
            <div className="w-64 h-8 bg-primary/20 rounded-lg mb-2"></div>
            <div className="w-96 h-6 bg-primary/20 rounded-lg"></div>
          </div>
        </div>
        <div className="lg:flex hidden items-center justify-center size-32 bg-primary/20 rounded-full"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.10, ease: "easeOut" }}
      className="relative z-10 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20 mb-12 overflow-hidden"
    >

         <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_20%,transparent_100%)] opacity-10"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 }
          }
        }}
        className="space-y-4 relative z-10"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20"
        >
          <div className="size-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-primary">Online & Ready</span>
        </motion.div>

        <motion.h1
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          className="text-4xl font-bold mb-2"
        >
          Good {getGreeting()},{" "}
          <span className="text-primary">{getUserName()}</span>
        </motion.h1>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          className="text-muted-foreground text-lg"
        >
          Your personal AI athlete coach is ready to help you achieve your fitness goals.
        </motion.p>
      </motion.div>

      <motion.div
        className="hidden lg:flex items-end justify-center absolute bottom-0 right-8"
      >
        <Image
          src="/FITNESS.png"
          alt="AI Fitness Coach"
          width={300}
          height={300}
          className="w-44 h-44 object-contain drop-shadow-lg"
        />
      </motion.div>
    </motion.div>
  );
}



