"use client";

import eventService from "@/services/eventService";
import { IEvent } from "@/services/types";
import { useDateFormater } from "@/util/useDateFormater";
import localStorageUtils from "@/util/useLocalStorage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function InvitePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [event, setEvent] = useState<IEvent>();
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const token = localStorageUtils.getItemFromLocalStorage("authToken");

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

  const getEventByID = async () => {
    setIsLoading(true);
    await eventService
      .getById(id)
      .then((res) => {
        setEvent(res);
      })
      .catch((err) => {
        if (err.message == "Please authenticate") {
          router.push(`/join?redirect=/invite/${id}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getEventByID();
    setIsLoading(false);
  }, []);

  const formattedStartTime = event ? useDateFormater(event.startTime) : "";
  const formattedEndTime = event ? useDateFormater(event.endTime) : "";

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!token) {
    return (
      <div className="container mt-5">
        <h1 className="alert alert-danger text-center" role="alert">
          Você precisa estar logado para entrar no evento.
        </h1>
        <button className="btn btn-primary d-block mx-auto">
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

  return (
    <div className="card mt-5 grid gap-0 row-gap-3">
      <div className="card-body p-10">
        <h1 className="card-title text-center">
          Convite para o evento: {event?.title}
        </h1>
        <p className="card-subtitle text-center">
          Descrição: {event?.description}
        </p>
        <div className="d-flex justify-content-evenly">
          <p>início: {formattedStartTime}</p>
          <p>término: {formattedEndTime}</p>
        </div>
        <button
          className="btn btn-primary d-block mx-auto"
          onClick={handleAcceptInvite}
        >
          Deseja participar?
        </button>
      </div>
      {responseMessage && (
        <div className="alert alert-success text-center" role="alert">
          {responseMessage}
        </div>
      )}
    </div>
  );
}
