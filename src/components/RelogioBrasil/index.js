import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Typography from "@mui/material/Typography";

function Relogio() {
  const [horaAtual, setHoraAtual] = useState(obterHoraAtualBrasil());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHoraAtual(obterHoraAtualBrasil());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function obterHoraAtualBrasil() {
    const dataAtual = new Date();
    const horaAtualBrasil = format(dataAtual, "HH:mm:ss", {
      locale: ptBR,
    });
    return horaAtualBrasil;
  }

  return (
    <Typography component="p" variant="h4">
      {horaAtual}
    </Typography>
  );
}

export default Relogio;
