import { format, getTime, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm, {
    locale: ptBR,
  }) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm,{
    locale: ptBR,
  }) : '';
}



export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function fDifMinutos(date1, date2) {
  const data1 = new Date(date1);
  const data2 = new Date(date2);
  const diffInMilliseconds = data2 - data1;
  const diffInMinutes = diffInMilliseconds / (1000 * 60);
  const hours = Math.floor(diffInMinutes / 60);
  const remainingMinutes = diffInMinutes % 60;
  const seconds = Math.floor((remainingMinutes - Math.floor(remainingMinutes)) * 60);
  return `${String(hours).padStart(2, '0')}:${String(Math.floor(remainingMinutes)).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function getDataFuturaPorDataEspecifica(data, dias) {
  data.setDate(data.getDate() + dias);
  return data;
}

export function fDataSemana(dataHora) {
  const data = getDataFuturaPorDataEspecifica(new Date(dataHora), 1);
  const formato = "EEEE, dd 'de' MMMM 'de' yyyy";
  const dataSemana = format(data, formato, { locale: ptBR }); // ptBR é o locale para português do Brasil
  return dataSemana.replace(/\w\S*/g, (match) => {
    return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
  }).replace(/\bDe\b/g, 'de');
}

export function fcalcMinutos(...dataHora) {
  const data = new Date(dataHora);
  const formato = "EEEE, d 'de' MMMM 'de' yyyy";

  return format(data, formato, { locale: ptBR }); // ptBR é o locale para português do Brasil
}

export function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}

export function minutosParaSegundos(tempo) {
  const partes = tempo.split(':');
  if (partes.length !== 3) {
    throw new Error('O formato de entrada deve ser "HH:mm:ss"');
  }

  const horas = parseInt(partes[0], 10);
  const minutos = parseInt(partes[1], 10);
  const segundos = parseInt(partes[2], 10);

  if (isNaN(horas) || isNaN(minutos) || isNaN(segundos)) {
    throw new Error('Os valores devem ser números inteiros');
  }

  const totalSegundos = horas * 3600000  + minutos * 60 + segundos;
  return totalSegundos;
}

export function obterHoraAtualBrasil() {
  const dataAtual = new Date();
  const horaAtualBrasil = format(dataAtual, 'HH:mm:ss', {
    locale: ptBR,
  });
  return horaAtualBrasil;
}