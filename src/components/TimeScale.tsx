import React from "react";

interface TimeScaleProps {
  dateRange: { start: Date; end: Date };
}

export const TimeScale: React.FC<TimeScaleProps> = ({ dateRange }) => (
  <div className="sticky top-0 flex justify-between w-full mb-2 text-sm text-gray-500">
    {Array.from({ length: 12 }).map((_, i) => {
      const date = new Date(dateRange.start);
      date.setMonth(date.getMonth() + i);
      return (
        <div
          key={i}
          className="absolute"
          style={{ left: `${(i / 11) * 100}%` }}
        >
          {date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </div>
      );
    })}
  </div>
);
