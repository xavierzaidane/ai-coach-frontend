import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { TargetIcon, MessageSquareIcon, BotMessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

function HealthOverview() {
  const trainingStats = {
    completedWorkouts: 12,
    totalWorkouts: 15,
  };

  const memberSince = "Jan 2024"; 

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TargetIcon className="size-5 text-primary" />
          Your Training Progress
        </CardTitle>
        <CardDescription>Track your fitness journey and achievements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-muted/30 rounded-xl">
            <div className="text-2xl font-bold text-primary mb-1">
              {trainingStats.completedWorkouts}
            </div>
            <div className="text-sm text-muted-foreground">Completed Workouts</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-xl">
            <div className="text-2xl font-bold text-primary mb-1">
              {trainingStats.totalWorkouts}
            </div>
            <div className="text-sm text-muted-foreground">Total Workouts</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-xl">
            <div className="text-2xl font-bold text-primary mb-1">
              {memberSince}
            </div>
            <div className="text-sm text-muted-foreground">Member Since</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
              <BotMessageSquare className="size-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Ready to level up?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Start a chat with your AI Coach or explore personalized training plans for your fitness goals.
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
        </div>
      </CardContent>
    </Card>
  );
}

export default HealthOverview;