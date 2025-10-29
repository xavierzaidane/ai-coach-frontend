// components/home/Navbar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme/mode-toggle";
import { User, LogOut, MessageCircle, Loader2, BotMessageSquare } from "lucide-react";

interface NavbarProps {
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
  isLoading?: boolean;
}

export default function Navbar({ user, onLogout, isLoading = false }: NavbarProps) {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/HomePage");
  };

  const handleLogout = () => {
    if (onLogout && !isLoading) {
      onLogout();
    }
  };

  const handleChatNavigation = () => {
    router.push("/chat");
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="absolute inset-0 bg-background/50 backdrop-blur-xl border-b border-border/40" />

        <div className="relative z-10">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Coac<span className="text-primary">hy</span>
          </Link>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <ModeToggle />

          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Button
                onClick={handleChatNavigation}
                size="sm"
                variant="default"
                className="flex items-center gap-2 bg-primary hover:bg-secondary text-white transition-colors"
                disabled={isLoading}
              >
                <BotMessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">AI Coach</span>
              </Button>

              <Button
                onClick={handleLogout}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                disabled={isLoading}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </nav>
    </header>
  );
}