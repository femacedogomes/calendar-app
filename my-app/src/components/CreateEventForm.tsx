import React from "react";

export interface IEventForm {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

interface ICreateEventForm {
  eventFormData: IEventForm;
  setEventFormData: React.Dispatch<React.SetStateAction<IEventForm>>;
}
export const CreateEventForm = ({
  eventFormData,
  setEventFormData,
}: ICreateEventForm) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventFormData({ ...eventFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Dados enviados:", eventFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
          value={eventFormData.startTime}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-black">Data e Hora de Término</label>
        <input
          type="datetime-local"
          className="form-control"
          name="endTime"
          value={eventFormData.endTime}
          onChange={handleChange}
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
