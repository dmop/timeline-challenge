import React from "react";

interface TimelineHeaderProps {
  zoomLevel: number;
  onZoom: (delta: number, clientX: number) => void;
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  zoomLevel,
  onZoom,
}) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Project Timeline</h2>
    <div className="flex items-center gap-4">
      <button
        onClick={(e) => onZoom(-1, e.clientX)}
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
      >
        Zoom Out
      </button>
      <span className="text-sm text-gray-600">
        {(zoomLevel * 100).toFixed(0)}%
      </span>
      <button
        onClick={(e) => onZoom(1, e.clientX)}
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
      >
        Zoom In
      </button>
    </div>
  </div>
);
