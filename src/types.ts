export interface TimelineItem {
  id: number;
  start: string;
  end: string;
  name: string;
}

export interface DragState {
  itemId: number | null;
  type: "start" | "end" | "move" | null;
  initialX: number;
  initialStart: string;
  initialEnd: string;
}

export interface TimelineEvent extends TimelineItem {
  lane: number;
}
