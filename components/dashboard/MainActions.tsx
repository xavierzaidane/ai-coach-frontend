"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { MessageSquareIcon, Dumbbell, Target, TargetIcon, BotMessageSquare } from "lucide-react";
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
        <Card className="relative overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 border-2 hover:border-secondary/40 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]"></div>
          <CardContent className="relative p-8">
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.12, rotate: 3 }}
                className="flex items-center justify-center transition-transform"
              >
                <Image
                  src="/Chip.png"
                  alt="AI Coach"
                  width={40}
                  height={40}
                  className="h-15 w-15 object-contain"
                />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold mb-1 transition-colors group-hover:text-secondary">AI Coach Chat</h3>
                <p className="text-muted-foreground text-[15px] transition-colors group-hover:text-secondary">
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
                  "w-full mt-7 bg-gradient-to-r from-primary to-primary/80 group-hover:from-secondary group-hover:to-secondary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
              })}
            >
              <BotMessageSquare/>
              Start Chat
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div custom={1} variants={cardVariants}>
        <Card className="relative overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 border-2 hover:border-secondary/40 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-secondary/10 group-hover:to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]"></div>
          <CardContent className="relative p-8">
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.12, rotate: 3 }}
                className="flex items-center justify-center transition-transform"
              >
                <Image
                  src="/Dart.png"
                  alt="AI Coach"
                  width={40}
                  height={40}
                  className="h-15 w-15 object-contain"
                />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold mb-1 transition-colors group-hover:text-secondary">Training Plans</h3>
                <p className="text-muted-foreground text-[15px] transition-colors group-hover:text-secondary">
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
              <Button className="w-full mt-7 bg-gradient-to-r from-primary to-primary/80 group-hover:from-secondary group-hover:to-secondary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <TargetIcon/>
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
    <div className="flex items-center gap-3 transition-colors">
      <div className="w-2 h-2 bg-primary group-hover:bg-secondary rounded-full transition-colors"></div>
      <span className="transition-colors group-hover:text-secondary">{text}</span>
    </div>
  );
}
