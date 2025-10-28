// app/login/page.tsx
"use client";

import { useState } from "react";
import { Eye, EyeOff, Dumbbell, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  isLoading?: boolean;
}

export default function LoginPage({ onLogin, isLoading = false }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 px-2 py-5 pt-2">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-20"></div>
      
      <Card className="w-full max-w-md border-border/40 bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="flex justify-center mb-2">
          </div>
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome to <span className="text-primary">Coachy</span>
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Sign in to your athlete dashboard
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email 
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    placeholder="athlete@example.com"
                    className="pl-10 h-11 bg-background/50 border-border/60 focus:border-primary/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    placeholder="Enter your password"
                    className="pl-10 pr-12 h-11 bg-background/50 border-border/60 focus:border-primary/60"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-9 w-9 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full h-11 text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="bg-muted/30 rounded-lg p-4 border border-border/40">
            <div className="flex items-start gap-3">
              <div className="size-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-xs text-primary font-semibold">i</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Demo Access</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Use any valid email address and a password with at least 3 characters to sign in.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Your personal AI coach awaits to help you achieve your fitness goals
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}