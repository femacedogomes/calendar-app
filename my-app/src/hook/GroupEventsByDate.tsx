import { IEvent } from "@/services/types";

export const useGroupEventsByDate = (events: IEvent[]) => {
  const groupEventsByDate = () => {
    const grouped = events.reduce<Record<string, IEvent[]>>((acc, event) => {
      const date = new Date(event.startTime).toLocaleDateString("pt-BR"); // Garantindo formato padrão
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});

    return grouped;
  };

  return {
    groupedEvents: groupEventsByDate(),
  };
};
