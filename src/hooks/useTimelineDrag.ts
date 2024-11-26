import { useState, useCallback } from "react";
import { DragState, TimelineItem } from "../types";
import { formatDate } from "../utils/dateUtils";

export const useTimelineDrag = (
  items: TimelineItem[],
  setItems: React.Dispatch<React.SetStateAction<TimelineItem[]>>,
  totalDuration: number,
  zoomLevel: number
) => {
  const [dragState, setDragState] = useState<DragState>({
    itemId: null,
    type: null,
    initialX: 0,
    initialStart: "",
    initialEnd: "",
  });

  const handleMouseDown = (
    e: React.MouseEvent,
    itemId: number,
    type: "start" | "end" | "move"
  ) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    setDragState({
      itemId,
      type,
      initialX: e.clientX,
      initialStart: item.start,
      initialEnd: item.end,
    });

    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent, timelineWidth: number) => {
      if (!dragState.itemId) return;

      const item = items.find((i) => i.id === dragState.itemId);
      if (!item) return;

      const pixelOffset = e.clientX - dragState.initialX;
      const timeOffset =
        (pixelOffset / timelineWidth) * totalDuration * (1 / zoomLevel);

      const updateDate = (dateStr: string) => {
        const date = new Date(dateStr);
        date.setTime(date.getTime() + timeOffset);
        return formatDate(date);
      };

      setItems((prev) =>
        prev.map((i) => {
          if (i.id !== dragState.itemId) return i;

          switch (dragState.type) {
            case "start":
              return { ...i, start: updateDate(dragState.initialStart) };
            case "end":
              return { ...i, end: updateDate(dragState.initialEnd) };
            case "move":
              return {
                ...i,
                start: updateDate(dragState.initialStart),
                end: updateDate(dragState.initialEnd),
              };
            default:
              return i;
          }
        })
      );
    },
    [dragState, totalDuration, zoomLevel, items, setItems]
  );

  const handleMouseUp = () => {
    setDragState({
      itemId: null,
      type: null,
      initialX: 0,
      initialStart: "",
      initialEnd: "",
    });
  };

  return {
    dragState,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
