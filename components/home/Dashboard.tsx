"use client";

import ActivityOverview from "@/components/dashboard/ActivityOverview";
import Navbar from "./Navbar";
import WelcomeSection from "../dashboard/WelcomeSection";
import MainActions from "../dashboard/MainActions";
import Footer from "./Footer";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface DashboardProps {
  user?: { name: string; email: string } | null;
}

function Dashboard({ user }: DashboardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -200px 0px", // Triggers animation 200px before element comes into view
  });

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8 pt-10">
        <WelcomeSection />
        <MainActions />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ActivityOverview />
        </motion.div>
      </div>
    </>
  );
}

export default Dashboard;