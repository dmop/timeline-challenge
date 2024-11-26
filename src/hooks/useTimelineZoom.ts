import { useState, useCallback, RefObject } from "react";

export const useTimelineZoom = (
  scrollContainerRef: RefObject<HTMLDivElement>,
  timelineRef: RefObject<HTMLDivElement>
) => {
  const [zoomLevel, setZoomLevel] = useState<number>(3);

  const handleZoom = useCallback(
    (delta: number, clientX: number) => {
      if (!scrollContainerRef.current || !timelineRef.current) return;

      const scrollContainer = scrollContainerRef.current;
      const timeline = timelineRef.current;

      const containerRect = scrollContainer.getBoundingClientRect();
      const scrollLeft = scrollContainer.scrollLeft;
      const containerWidth = containerRect.width;
      const timelineWidth = timeline.scrollWidth;

      const zoomPoint =
        (scrollLeft + (clientX - containerRect.left)) / timelineWidth;

      const oldZoom = zoomLevel;
      const newZoom = Math.min(Math.max(0.1, oldZoom + delta * 0.1), 5);

      const newTimelineWidth = containerWidth * newZoom;
      const newScrollLeft =
        zoomPoint * newTimelineWidth - (clientX - containerRect.left);

      setZoomLevel(newZoom);

      requestAnimationFrame(() => {
        scrollContainer.scrollLeft = newScrollLeft;
      });
    },
    [zoomLevel, scrollContainerRef, timelineRef]
  );

  return {
    zoomLevel,
    handleZoom,
  };
};
