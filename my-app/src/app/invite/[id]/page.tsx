"use client";

import { Events } from "@/data";
import eventService from "@/services/eventService";
import { IEvent } from "@/services/types";
import { useDateFormater } from "@/util/useDateFormater";
import localStorageUtils from "@/util/useLocalStorage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default function InvitePage({ params }: PageProps) {
  const { id } = params;
  const [event, setEvent] = useState<IEvent>();
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const token = localStorageUtils.getItemFromLocalStorage("authToken");

  useEffect(() => {
    setEvent(Events[0]);
  }, []);

  const formattedStartDate = useDateFormater(event.startTime);
  const formattedEndDate = useDateFormater(event.endTime);

  const handleAcceptInvite = async () => {
    setIsLoading(true);
    await eventService
      .acceptInvite(id)
      .then(() => {
        setResponseMessage(
          "Foi confirmado a sua participação no evento! Você será redirecionado para a página do evento."
        );
        setTimeout(() => {
          router.push("/");
        }, 4000);
      })
      .catch((err) => {
        setResponseMessage(
          "Ocorreu um erro ao confirmar a sua participação no evento!: " +
            err.message
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!token) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Você precisa estar logado para entrar no evento.
        </div>
        <button className="btn btn-primary">
          <Link
            href={{
              pathname: "/join",
              query: {
                redirect: "/invite/" + id,
              },
            }}
          >
            Iniciar sessão
          </Link>
        </button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Evento não encontrado.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Convite para o evento: {event?.title}</h1>
      <p>Descrição: {event?.description}</p>
      <p>início: {formattedStartDate}</p>
      <p>térmico: {formattedEndDate}</p>
      <button
        className="btn btn-primary"
        disabled={!isLoading}
        onClick={handleAcceptInvite}
      >
        Deseja participar?
      </button>
      {responseMessage}
    </div>
  );
}
