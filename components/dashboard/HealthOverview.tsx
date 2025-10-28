"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { TargetIcon, BotMessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

function HealthOverview() {
  const trainingStats = {
    completedWorkouts: 12,
    totalWorkouts: 15,
  };

  const memberSince = "Jan 2024"; 

  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  // Simple smooth count-up animation
  const animateCount = (target: number, setter: (val: number) => void, duration = 1000) => {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setter(Math.floor(start));
    }, 16);
  };

  useEffect(() => {
    animateCount(trainingStats.completedWorkouts, setCompleted);
    animateCount(trainingStats.totalWorkouts, setTotal);
  }, []);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TargetIcon className="size-5 text-primary" />
          Your Training Progress
        </CardTitle>
        <CardDescription>
          Track your fitness journey and achievements
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Stats Section with Animation */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Completed Workouts */}
          <div className="text-center p-4">
            <motion.div
              className="text-3xl font-bold text-primary mb-1"
              key={completed}
              initial={{ opacity: 10 }}
              animate={{ opacity: 10 }}
              transition={{ duration: 0.5 }}
            >
              {completed}
            </motion.div>
            <div className="text-sm text-muted-foreground">Completed Workouts</div>
          </div>

          {/* Total Workouts */}
          <div className="text-center p-4">
            <motion.div
              className="text-3xl font-bold text-primary mb-1"
              key={total}
              initial={{ opacity: 10 }}
              animate={{ opacity: 10 }}
              transition={{ duration: 0.5 }}
            >
              {total}
            </motion.div>
            <div className="text-sm text-muted-foreground">Total Workouts</div>
          </div>

          {/* Member Since */}
          <div className="text-center p-4">
            <motion.div
              className="text-3xl font-bold text-primary mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {memberSince}
            </motion.div>
            <div className="text-sm text-muted-foreground">Member Since</div>
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <div className="flex items-start gap-3">
            <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
              <BotMessageSquare className="size-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">
                Ready to level up?
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Start a chat with your AI Coach or explore personalized training
                plans for your fitness goals.
              </p>
              <div className="flex gap-2">
                <Link href="/chat">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Chat with AI Coach
                  </Button>
                </Link>
                <Link href="/training">
                  <Button size="sm" variant="outline">
                    View Training Plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

export default HealthOverview;
