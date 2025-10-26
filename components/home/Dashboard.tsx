// components/home/Dashboard.tsx
import ActivityOverview from "@/components/dashboard/ActivityOverview";
import Navbar from "./Navbar";
import WelcomeSection from "../dashboard/WelcomeSection";
import MainActions from "../dashboard/MainActions";
import Footer from "./Footer";

interface DashboardProps {
  user?: { name: string; email: string } | null;
}

function Dashboard({ user }: DashboardProps) {
  return (
    <>
       <div className="max-w-7xl mx-auto px-6 py-8 pt-10">
      <WelcomeSection />
      <MainActions />
      <ActivityOverview />
      <div className="mt-10"><Footer/></div>
    </div>
    </>
  );
}

export default Dashboard;