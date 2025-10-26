"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { MessageSquareIcon, Dumbbell, Target, BotMessageSquareIcon } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.45,
      ease: "easeOut"
    }
  }),
};

export default function MainActions() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 gap-8 mb-12"
    >
      <motion.div custom={0} variants={cardVariants}>
        <Card className="relative overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 border-2 hover:border-primary/40 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]"></div>
          <CardContent className="relative p-8">
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.12, rotate: 3 }}
                className="w-16 h-16 bg-gradient-to-br from-primary/25 to-primary/10 rounded-2xl flex items-center justify-center"
              >
                <BotMessageSquareIcon className="h-8 w-8 text-primary" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold mb-1">AI Coach Chat</h3>
                <p className="text-muted-foreground text-[15px]">
                  Get instant training advice and personalized guidance
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <ItemBullet text="24/7 availability" />
              <ItemBullet text="Personalized workout plans" />
              <ItemBullet text="Progress tracking & analysis" />
            </div>

            <Link
              href="/chat"
              className={buttonVariants({
                variant: "default",
                className:
                  "w-full mt-7 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
              })}
            >
              <MessageSquareIcon className="mr-2 h-5 w-5" />
              Start Chat
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div custom={1} variants={cardVariants}>
        <Card className="relative overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 border-2 hover:border-primary/40 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]"></div>
          <CardContent className="relative p-8">
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.12, rotate: 3 }}
                className="w-16 h-16 bg-gradient-to-br from-primary/25 to-primary/10 rounded-2xl flex items-center justify-center"
              >
                <Target className="h-8 w-8 text-primary" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Training Plans</h3>
                <p className="text-muted-foreground text-[15px]">
                  Custom workout programs for your fitness goals
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <ItemBullet text="Goal-specific programs" />
              <ItemBullet text="Flexible scheduling" />
              <ItemBullet text="Progress adjustments" />
            </div>

            <Link href="/training">
              <Button className="w-full mt-7 border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 font-semibold py-3 rounded-xl transition-all duration-300">
                <Dumbbell className="mr-2 h-5 w-5" />
                View Plans
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function ItemBullet({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-primary rounded-full"></div>
      <span>{text}</span>
    </div>
  );
}
