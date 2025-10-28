"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Navbar from "@/components/home/Navbar";
import Dashboard from "@/components/home/Dashboard";
import LoginPage from "./login/page";
import Footer from "@/components/home/Footer";
import { motion, useInView } from "framer-motion";


export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const footerRef = useRef(null);
  const isFooterInView = useInView(footerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("auth_token");
        const userData = localStorage.getItem("user_data");

        if (token && userData) {
          setIsAuthenticated(true);
          setUser(JSON.parse(userData));
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      if (!email || !password) {
        toast.error("Please enter both email and password");
        setIsLoading(false);
        return;
      }

      if (!email.includes('@')) {
        toast.error("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (password.length < 3) {
        toast.error("Password must be at least 3 characters");
        setIsLoading(false);
        return;
      }

      const userData = {
        name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        email: email,
      };

      localStorage.setItem("auth_token", "demo_token_" + Date.now());
      localStorage.setItem("user_data", JSON.stringify(userData));

      setIsAuthenticated(true);
      setUser(userData);

      toast.success(`Welcome back, ${userData.name}!`);
      
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setIsAuthenticated(false);
    setUser(null);
    toast.info("Signed out successfully");
    router.push("/");
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar user={null} onLogout={handleLogout} />
        <div className="flex-1 flex items-center justify-center pt-16">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar 
        user={isAuthenticated ? user : null} 
        onLogout={handleLogout} 
        isLoading={isLoading}
      />
      <main className="flex flex-col min-h-screen overflow-hidden pt-15">
        {!isAuthenticated ? (
          <LoginPage onLogin={handleLogin} isLoading={isLoading} />
        ) : (
          <Dashboard user={user} />
        )}
      </main>
      <Footer/>
    </div>
  );
}