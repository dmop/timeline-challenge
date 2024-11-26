import React, { useRef, useState, useEffect } from "react";
import { TimelineHeader } from "./TimelineHeader";
import { TimelineEvent } from "./TimelineEvent";
import { TimeScale } from "./TimeScale";
import { useTimelineDrag } from "../hooks/useTimelineDrag";
import { useTimelineZoom } from "../hooks/useTimelineZoom";
import { calculateDateRange } from "../utils/dateUtils";
import { assignLanes } from "../utils/laneUtils";
import type { TimelineItem } from "../types";

export const InteractiveTimeline: React.FC<{ items: TimelineItem[] }> = ({
  items: initialItems,
}) => {
  const [items, setItems] = useState(initialItems);
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const dateRange = calculateDateRange(items);
  const totalDuration = dateRange.end.getTime() - dateRange.start.getTime();

  const { zoomLevel, handleZoom } = useTimelineZoom(
    scrollContainerRef,
    timelineRef
  );
  const { dragState, handleMouseDown, handleMouseMove, handleMouseUp } =
    useTimelineDrag(items, setItems, totalDuration, zoomLevel);

  const eventsWithLanes = assignLanes(items);
  const maxLane = Math.max(...eventsWithLanes.map((event) => event.lane));

  const handleNameEdit = (itemId: number, newName: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, name: newName } : item
      )
    );
    setEditingItem(null);
  };

  useEffect(() => {
    if (dragState.itemId) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        if (timelineRef.current) {
          handleMouseMove(e, timelineRef.current.offsetWidth);
        }
      };

      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleGlobalMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragState, handleMouseMove, handleMouseUp]);

  return (
    <div className="w-full max-w-6xl p-6 mx-auto bg-white shadow-lg rounded-xl">
      <TimelineHeader zoomLevel={zoomLevel} onZoom={handleZoom} />

      <div
        ref={scrollContainerRef}
        className="relative overflow-x-auto"
        style={{ width: "100%" }}
      >
        <div
          ref={timelineRef}
          className="relative"
          style={{
            width: `${100 * zoomLevel}%`,
            height: `${(maxLane + 1) * 60 + 40}px`,
            minWidth: "100%",
          }}
        >
          <TimeScale dateRange={dateRange} />

          {eventsWithLanes.map((event) => {
            const start = new Date(event.start).getTime();
            const end = new Date(event.end).getTime();
            const left =
              ((start - dateRange.start.getTime()) / totalDuration) * 100;
            const width = Math.max(((end - start) / totalDuration) * 100, 2);

            return (
              <TimelineEvent
                key={event.id}
                event={event}
                dragState={dragState}
                onMouseDown={handleMouseDown}
                onEdit={setEditingItem}
                isEditing={editingItem === event.id}
                onNameEdit={handleNameEdit}
                left={left}
                width={width}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
