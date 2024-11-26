import timelineItems from "./data/timelineItems";
import { InteractiveTimeline } from "./components/InteractiveTimeline";

export default function App() {
  return <InteractiveTimeline items={timelineItems} />;
}
