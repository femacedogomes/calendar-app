"use client";
import { useState } from "react";
import { Events } from "@/data/index";
import { IEvent } from "@/services/types";
import { EventCard } from "@/components/EventCard";
import { CreateEventForm } from "@/components/CreateEventForm";
import { useGroupEventsByDate } from "@/hook/GroupEventsByDate";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const initialEventFormData = {
  title: "",
  description: "",
  startTime: "",
  endTime: "",
};

export default function Home() {
  const [events, setEvents] = useState<IEvent[]>(Events);
  const [eventFormData, setEventFormData] = useState(initialEventFormData);
  const { groupedEvents } = useGroupEventsByDate(events);

  return (
    <div className="container mt-5">
      <div
        className="modal fade"
        id="CreateEventModal"
        tabIndex={-1}
        aria-labelledby="CreateEventModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-white rounded-2">
              <h1
                className="modal-title fs-5 text-black"
                id="CreateEventModalLabel"
              >
                Novo evento
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CreateEventForm
                eventFormData={eventFormData}
                setEventFormData={setEventFormData}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <h1 className="h1 text-black">Eventos</h1>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#CreateEventModal"
        >
          Criar evento
        </button>
      </div>

      {events.length > 0 ? (
        <div className="overflow-auto w-100">
          <div
            className="row flex-nowrap p-4"
            style={{ minWidth: "max-content" }}
          >
            {Object.entries(groupedEvents as Record<string, IEvent[]>)
              .sort(
                ([dateA], [dateB]) =>
                  new Date(dateA).getTime() - new Date(dateB).getTime()
              )
              .map(([date, dateEvents]) => {
                const sortedEvents = (dateEvents as IEvent[]).sort(
                  (a, b) =>
                    new Date(a.startTime).getTime() -
                    new Date(b.startTime).getTime()
                );

                return (
                  <div key={date} className="col-md-4 mb-4 border-end">
                    <h3 className="h5 mb-3 text-black text-center">
                      {new Date(date).toLocaleDateString("pt-BR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    <div className="d-flex flex-column gap-3">
                      {sortedEvents.map((event) => (
                        <EventCard event={event} key={event._id} />
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <h2 className="h2 text-black">Você não possui nenhum evento marcado</h2>
      )}
    </div>
  );
}
