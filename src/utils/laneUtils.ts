import { TimelineItem, TimelineEvent } from "../types";
import { parseDate } from "./dateUtils";

export const assignLanes = (items: TimelineItem[]): TimelineEvent[] => {
  const sortedEvents = [...items].sort(
    (a, b) => parseDate(a.start).getTime() - parseDate(b.start).getTime()
  );

  const assignedEvents: TimelineEvent[] = [];

  const eventsOverlap = (event1: TimelineItem, event2: TimelineItem) => {
    const start1 = parseDate(event1.start).getTime();
    const end1 = parseDate(event1.end).getTime();
    const start2 = parseDate(event2.start).getTime();
    const end2 = parseDate(event2.end).getTime();
    const buffer = 24 * 60 * 60 * 1000;
    return start1 <= end2 + buffer && start2 - buffer <= end1;
  };

  sortedEvents.forEach((event) => {
    let lane = 0;
    let foundLane = false;

    while (!foundLane) {
      const eventsInLane = assignedEvents.filter((e) => e.lane === lane);
      const hasOverlap = eventsInLane.some((existingEvent) =>
        eventsOverlap(event, existingEvent)
      );

      if (!hasOverlap) {
        foundLane = true;
      } else {
        lane++;
      }
    }

    assignedEvents.push({ ...event, lane });
  });

  return assignedEvents;
};
