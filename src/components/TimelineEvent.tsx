import React from "react";
import { DragState, TimelineEvent as TimelineEventType } from "../types";

interface TimelineEventProps {
  event: TimelineEventType;
  dragState: DragState;
  onMouseDown: (
    e: React.MouseEvent,
    itemId: number,
    type: "start" | "end" | "move"
  ) => void;
  onEdit: (itemId: number) => void;
  isEditing: boolean;
  onNameEdit: (itemId: number, newName: string) => void;
  left: number;
  width: number;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  event,
  dragState,
  onMouseDown,
  onEdit,
  isEditing,
  onNameEdit,
  left,
  width,
}) => (
  <div
    className="absolute transition-shadow duration-200 rounded-lg hover:shadow-md group"
    style={{
      left: `${left}%`,
      width: `${width}%`,
      top: `${event.lane * 60 + 30}px`,
      height: "50px",
      cursor: dragState.itemId === event.id ? "grabbing" : "grab",
    }}
  >
    <div
      className="absolute left-0 w-2 h-full cursor-ew-resize hover:bg-blue-300"
      onMouseDown={(e) => onMouseDown(e, event.id, "start")}
    />
    <div
      className="absolute right-0 w-2 h-full cursor-ew-resize hover:bg-blue-300"
      onMouseDown={(e) => onMouseDown(e, event.id, "end")}
    />

    <div
      className="w-full h-full p-2 text-white transition-colors bg-blue-500 rounded-lg group-hover:bg-blue-600"
      onMouseDown={(e) => onMouseDown(e, event.id, "move")}
      onDoubleClick={() => onEdit(event.id)}
    >
      {isEditing ? (
        <input
          type="text"
          className="w-full px-1 text-sm text-black bg-white rounded"
          defaultValue={event.name}
          onBlur={(e) => onNameEdit(event.id, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onNameEdit(event.id, e.currentTarget.value);
            }
          }}
          autoFocus
        />
      ) : (
        <div className="text-sm font-medium truncate">{event.name}</div>
      )}
      <div className="text-xs truncate opacity-80">
        {new Date(event.start).toLocaleDateString()} -{" "}
        {new Date(event.end).toLocaleDateString()}
      </div>
    </div>
  </div>
);
