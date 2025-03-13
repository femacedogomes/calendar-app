import { IEvent } from "@/services/types";
import { getCountdown } from "@/util/getCountDown";
import { useDateFormater } from "@/util/useDateFormater";
import { useEffect, useState } from "react";
import { EventForm } from "./EventForm";
import useLocalStorage from "@/util/useLocalStorage";

const apiUrl = process.env.NEXT_PUBLIC_APP_URL;

interface IEventCard {
  event: IEvent;
  onDeleteEvent: (eventId: string) => Promise<void>;
  onUpdateEvent: (eventId: IEvent) => Promise<void>;
}

export const EventCard = ({
  event,
  onDeleteEvent,
  onUpdateEvent,
}: IEventCard) => {
  const { title, description, attendees, startTime, endTime, _id, createdBy } =
    event;
  const [updatedEvent, setUpdatedEvent] = useState<IEvent>(event);
  const [countdown, setCountdown] = useState(getCountdown(startTime));
  const now = new Date();
  const eventStart = new Date(startTime);
  const eventEnd = new Date(endTime);
  const user = useLocalStorage.getItemFromLocalStorage("user");
  const parsedUser = JSON.parse(user as string);
  const isEventOngoing = now >= eventStart && now <= eventEnd;
  const isEventEnded = now > eventEnd;

  const handleDelete = async () => {
    await onDeleteEvent(event._id);
  };

  const handleEditEvent = async () => {
    await onUpdateEvent(updatedEvent);
  };

  const cardStyle = {
    border: isEventOngoing
      ? "2px solid #FFA500"
      : isEventEnded
      ? "2px solid #FF0000"
      : "",
    maxWidth: "450px",
  };

  const copyInviteLinkToClipboard = () => {
    const inviteLink = `${apiUrl}/invite/${_id}`;
    navigator.clipboard.writeText(inviteLink);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(startTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {}, [user]);
  return (
    <div className="card mb-4 shadow mw-50" style={cardStyle}>
      <div
        className="modal fade"
        id={`UpdateEventModal-${_id}`}
        tabIndex={-1}
        aria-labelledby={`UpdateEventModalLabel-${_id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-white rounded-2">
              <h1
                className="modal-title fs-5 text-black"
                id="UpdateEventModalLabel"
              >
                Atualizar Evento
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
                eventFormData={updatedEvent}
                setEventFormData={setUpdatedEvent}
                onSubmit={handleEditEvent}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="card-header  justify-content-between bg-white ">
          <h2 className="h2 card-title">{title}</h2>
          {countdown.seconds > 0 && (
            <p className="p">
              Inicia em: {countdown.days > 0 && countdown.days + "d"}{" "}
              {countdown.hours > 0 && countdown.hours + "h"}{" "}
              {countdown.minutes > 0 && countdown.minutes + "m"}{" "}
              {countdown.seconds}s
            </p>
          )}
        </div>
        <p className="lead card-text">{description}</p>
        <div className="d-flex flex-wrap justify-content-between">
          <p>
            Início:
            {useDateFormater(startTime)}
          </p>
          <p>
            Término:
            {useDateFormater(endTime)}
          </p>
        </div>
        número de convidados: {attendees.length}
        {createdBy == parsedUser?.id && (
          <div className="d-flex justify-content-between flex-wrap">
            <button
              type="button"
              onClick={copyInviteLinkToClipboard}
              className="btn btn-link"
            >
              copiar link de convite
            </button>
            <div className="d-flex gap-2">
              <button className="btn btn-danger" onClick={handleDelete}>
                Deletar
              </button>
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={`#UpdateEventModal-${_id}`}
              >
                Editar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
