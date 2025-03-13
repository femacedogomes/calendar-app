"use client";
import { useEffect, useState } from "react";
import { IEvent, IUser } from "@/services/types";
import { EventCard } from "@/components/EventCard";
import { EventForm } from "@/components/EventForm";
import { useGroupEventsByDate } from "@/hook/GroupEventsByDate";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import useLocalStorage from "@/util/useLocalStorage";
import { useRouter } from "next/navigation";
import eventService from "@/services/eventService";

const initialEventFormData = {
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  attendees: [],
  _id: "",
  status: "",
  createdAt: "",
  updatedAt: "",
  createdBy: {
    name: "",
    email: "",
    id: "",
  },
};

export default function Home() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventFormData, setEventFormData] =
    useState<IEvent>(initialEventFormData);
  const [userSession, setUserSession] = useState<IUser>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const authToken =
      useLocalStorage.getItemFromLocalStorage<string>("authToken");

    if (!authToken) {
      router.push("/join");
    }
    const user = useLocalStorage.getItemFromLocalStorage("user");
    if (!user) {
      router.push("/join");
    } else {
      const parsedUser = JSON.parse(user as string);
      setUserSession(parsedUser);
    }
  }, []);

  const getEvents = async () => {
    try {
      const res: IEvent[] = await eventService.getAll();
      setEvents(res);
    } catch {
      router.push("/join");
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    await eventService
      .delete(eventId)
      .then(() =>
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        )
      );
  };
  const handleCreateEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await eventService
      .create(eventFormData)
      .then((res) => {
        setEvents((prevEvents) => [...prevEvents, res]);
        setEventFormData(initialEventFormData);
        setSuccessMessage("Evento criado com sucesso!");
        setErrorMessage("");
      })
      .catch((err) => {
        setSuccessMessage("");
        setErrorMessage(err.message);
      });
  };

  const handleLogout = () => {
    useLocalStorage.removeItemFromLocalStorage("authToken");
    useLocalStorage.removeItemFromLocalStorage("user");
    router.push("/join");
  };

  useEffect(() => {
    if (userSession) {
      getEvents();
    }
  }, [userSession]);

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
              <EventForm
                eventFormData={eventFormData}
                setEventFormData={setEventFormData}
                onSubmit={handleCreateEvent}
              />
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex">
        <button className="btn btn-danger ms-auto" onClick={handleLogout}>
          Deslogar
        </button>
      </div>

      <h2 className="text-center text-black p-4">Olá! {userSession?.name}</h2>
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
          <div className="row flex-nowrap p-4 custom-flex">
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
                  <div
                    key={date}
                    className="col-md-4 mb-4 border-end custom-col"
                    style={{ maxWidth: "450px" }}
                  >
                    <h3 className="h5 mb-3 text-black text-center">
                      {new Date(date).toLocaleDateString("pt-BR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </h3>
                    <div className="d-flex flex-column gap-3">
                      {sortedEvents.map((event) => (
                        <EventCard
                          event={event}
                          key={event._id}
                          onDeleteEvent={handleDeleteEvent}
                        />
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
