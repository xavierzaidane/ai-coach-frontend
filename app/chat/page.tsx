import ChatInterface from "@/components/chat-interfaces";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden mt-4">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_100%)] opacity-40 dark:opacity-20" />
      <div className="absolute top-0 left-0 -z-10 w-96 h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 -z-10 w-96 h-96 bg-gradient-to-br from-primary/5 to-primary/10 rounded-full blur-3xl opacity-50" />

      <Navbar />

      <main className="flex-1 pt-16">
        <ChatInterface />
      </main>

      <div className="mt-10"><Footer /></div>
      
    </div>
  );
}
