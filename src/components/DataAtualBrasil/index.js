import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Typography from "@mui/material/Typography";
function DataAtual() {
  const [dataAtual, setDataAtual] = useState(obterDataAtual());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDataAtual(obterDataAtual());
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(intervalId);
  }, []);

  function obterDataAtual() {
    const dataAtual = new Date();
    const dataFormatada = format(dataAtual, "dd/MM/yyyy");
    return dataFormatada;
  }

  return (
    <Typography component="p" variant="h4">
      {dataAtual}
    </Typography>
  );
}

export default DataAtual;
