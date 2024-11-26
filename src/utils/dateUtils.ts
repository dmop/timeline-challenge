import { TimelineItem } from "../types";

export const parseDate = (dateStr: string): Date => new Date(dateStr);

export const formatDate = (date: Date): string =>
  date.toISOString().split("T")[0];

export const calculateDateRange = (items: TimelineItem[]) => {
  const dates = items.flatMap((item) => [
    parseDate(item.start),
    parseDate(item.end),
  ]);
  const start = new Date(Math.min(...dates.map((date) => date.getTime())));
  const end = new Date(Math.max(...dates.map((date) => date.getTime())));

  // Add padding to the range
  start.setMonth(start.getMonth() - 1);
  end.setMonth(end.getMonth() + 1);

  return { start, end };
};
