import { IEvent } from "./types/index";
import { baseService } from "./baseService";

const eventService = {
  async getAll() {
    return baseService.get("/event");
  },

  async getById(eventId: string) {
    return baseService.get(`/event/${eventId}`);
  },

  async acceptInvite(eventId: string) {
    return baseService.post(`/event/${eventId}/invite`);
  },

  async create(event: IEvent) {
    const eventBody = {
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
    };
    return baseService.post("/event", eventBody);
  },

  async update(event: IEvent) {
    const eventBody = {
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
    };
    return baseService.put(`/event/${event._id}`, eventBody);
  },

  async delete(eventId: string) {
    baseService.delete(`/event/${eventId}`);
  },
};

export default eventService;
