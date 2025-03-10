import { IEvent } from "@/services/types";
import { getCountdown } from "@/util/getCountDown";
import { useDateFormater } from "@/util/useDateFormater";
import { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface IEventCard {
  event: IEvent;
}

export const EventCard = ({ event }: IEventCard) => {
  const { title, description, attendees, startTime, endTime, _id } = event;
  const [countdown, setCountdown] = useState(getCountdown(startTime));
  const now = new Date();
  const eventStart = new Date(startTime);
  const eventEnd = new Date(endTime);

  const isEventOngoing = now >= eventStart && now <= eventEnd;
  const isEventEnded = now > eventEnd;

  const cardStyle = {
    border: isEventOngoing
      ? "2px solid #FFA500" // Orange for ongoing events
      : isEventEnded
      ? "2px solid #FF0000" // Red for ended events
      : "",
  };

  const copyInviteLinkToClipboard = () => {
    const inviteLink = `${apiUrl}/event/${_id}/invite`;
    navigator.clipboard.writeText(inviteLink);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(startTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  return (
    <div className="card mb-4 shadow" style={cardStyle}>
      <div className="card-body">
        <div className="card-header d-flex justify-content-between bg-white ">
          <h2 className="h2 card-title">{title}</h2>
          <p className="p">
            Inicia em: <br /> {countdown.days > 0 && countdown.days + "d"}{" "}
            {countdown.hours > 0 && countdown.hours + "h"}{" "}
            {countdown.minutes > 0 && countdown.minutes + "m"}{" "}
            {countdown.seconds}s
          </p>
        </div>
        <p className="lead card-text">{description}</p>
        <div className="d-flex justify-content-between">
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
        <div className="d-flex justify-content-between">
          <button
            type="button"
            onClick={copyInviteLinkToClipboard}
            className="btn btn-link"
          >
            copiar link de convite
          </button>
          <div className="d-flex gap-2">
            <button className="btn btn-danger">Deletar</button>
            <button className="btn btn-primary">Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
