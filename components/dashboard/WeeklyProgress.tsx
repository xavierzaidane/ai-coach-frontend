import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, ClockIcon, TargetIcon } from "lucide-react";

function WeeklyProgress() {
  const weeklyStats = {
    completedWorkouts: 3,
    totalWorkouts: 5,
    nextWorkout: {
      type: "Strength Training",
      day: "Friday",
      date: "October 27, 2025",
      time: "6:00 PM",
      duration: "60 mins"
    },
    upcomingWorkouts: 2
  };

  const isToday = weeklyStats.nextWorkout.day === "Friday";

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TargetIcon className="size-5 text-primary" />
          Weekly Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">
              {isToday ? "Today" : "Upcoming"}
            </span>
          </div>
          <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            {weeklyStats.completedWorkouts}/{weeklyStats.totalWorkouts} Completed
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <TargetIcon className="size-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">{weeklyStats.nextWorkout.type}</p>
              <p className="text-xs text-muted-foreground">Next session</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <CalendarIcon className="size-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">{weeklyStats.nextWorkout.date}</p>
              <p className="text-xs text-muted-foreground">
                {isToday ? "Today" : weeklyStats.nextWorkout.day}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <ClockIcon className="size-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">{weeklyStats.nextWorkout.time}</p>
              <p className="text-xs text-muted-foreground">{weeklyStats.nextWorkout.duration}</p>
            </div>
          </div>
        </div>

        {weeklyStats.upcomingWorkouts > 0 && (
          <p className="text-xs text-center text-muted-foreground">
            +{weeklyStats.upcomingWorkouts} more workout{weeklyStats.upcomingWorkouts > 1 ? "s" : ""} this week
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default WeeklyProgress;