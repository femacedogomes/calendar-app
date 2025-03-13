import { useMemo } from "react";
import { IEvent } from "@/services/types";

export const useGroupEventsByDate = (events: IEvent[]) => {
  const groupedEvents = useMemo(() => {
    return events.reduce<Record<string, IEvent[]>>((acc, event) => {
      const date = new Date(event.startTime).toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});
  }, [events]); // Só recalcula quando `events` mudar.

  return { groupedEvents };
};
