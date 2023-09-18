import { format, getTime, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
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
  const formato = "EEEE, d 'de' MMMM 'de' yyyy";
  return format(data, formato, { locale: ptBR }); // ptBR é o locale para português do Brasil
}

export function fcalcMinutos(...dataHora) {
  const data = new Date(dataHora);
  const formato = "EEEE, d 'de' MMMM 'de' yyyy";

  return format(data, formato, { locale: ptBR }); // ptBR é o locale para português do Brasil
}