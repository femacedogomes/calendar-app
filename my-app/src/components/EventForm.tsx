import { IEvent } from "@/services/types";
import React from "react";

interface ICreateEventForm {
  eventFormData: IEvent;
  setEventFormData: React.Dispatch<React.SetStateAction<IEvent>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
export const EventForm = ({
  eventFormData,
  setEventFormData,
  onSubmit,
}: ICreateEventForm) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventFormData({ ...eventFormData, [e.target.name]: e.target.value });
  };

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    date.setHours(date.getHours() - 3);
    return date.toISOString().slice(0, 16);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label text-black">Título</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={eventFormData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label text-black">Descrição</label>
        <textarea
          className="form-control"
          name="description"
          rows={3}
          value={eventFormData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label text-black">Data e Hora de Início</label>
        <input
          type="datetime-local"
          className="form-control"
          name="startTime"
          value={formatDateForInput(eventFormData.startTime)}
          onChange={(e) => {
            setEventFormData({ ...eventFormData, startTime: e.target.value });
          }}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-black">Data e Hora de Término</label>
        <input
          type="datetime-local"
          className="form-control"
          name="endTime"
          value={formatDateForInput(eventFormData.endTime)}
          onChange={(e) => {
            setEventFormData({ ...eventFormData, endTime: e.target.value });
          }}
          required
        />
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          Salvar Evento
        </button>
      </div>
    </form>
  );
};
