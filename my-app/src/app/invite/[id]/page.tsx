"use client";

import { Events } from "@/data";
import { IEvent } from "@/services/types";
import { useDateFormater } from "@/util/useDateFormater";
import localStorageUtils from "@/util/useLocalStorage";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default function InvitePage({ params }: PageProps) {
  const { id } = params;
  const [event, setEvent] = useState<IEvent>();
  const token = localStorageUtils.getItemFromLocalStorage("authToken");

  useEffect(() => {
    setEvent(Events[0]);
  }, []);

  const formattedStartDate = useDateFormater(event.startTime);
  const formattedEndDate = useDateFormater(event.endTime);

  if (!token) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Você precisa estar logado para entrar no evento.
        </div>
        <button className="btn btn-primary">
          <Link href="/login">Iniciar sessão</Link>
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
    </div>
  );
}
