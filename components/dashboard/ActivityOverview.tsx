import HealthOverview from "./HealthOverview";
import WeeklyProgress from "./WeeklyProgress";


function ActivityOverview() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <HealthOverview />
      <WeeklyProgress />
    </div>
  );
}
export default ActivityOverview;