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

export function fDifMinutosSomado(date1, date2, date3) {
  const data1 = new Date(date1);
  const data2 = new Date(date2);
  const data3 = new Date(date3);
  const data4 = new Date(getCurrentDateTime());

  const diffInMilliseconds1 = data2 - data1;
  const diffInMilliseconds2 = data4 - data3 ;
  const diffInMilliseconds = diffInMilliseconds1 + diffInMilliseconds2;

  const diffInMinutes = diffInMilliseconds / (1000 * 60);
  const hours = Math.floor(diffInMinutes / 60);
  const remainingMinutes = diffInMinutes % 60;
  const seconds = Math.floor((remainingMinutes - Math.floor(remainingMinutes)) * 60);
  return `${String(hours).padStart(2, '0')}:${String(Math.floor(remainingMinutes)).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function fDifMinutosPonto(date1, date2) {
  const data1 = new Date(date1);
  const data2 = new Date(date2);
  const diffInMilliseconds = data2 - data1;
  const diffInMinutes = diffInMilliseconds / (1000 * 60);
  const hours = Math.floor(diffInMinutes / 60);
  const remainingMinutes = diffInMinutes % 60;
  const seconds = Math.floor((remainingMinutes - Math.floor(remainingMinutes)) * 60);
  return `${String(hours).padStart(2, '0')}h ${String(Math.floor(remainingMinutes)).padStart(2, '0')}m`;
}

export function fDifMinutosPontoTotal(date1, date2, date3, date4) {
  const data1 = new Date(date1);
  const data2 = new Date(date2);
  const data3 = new Date(date3);
  const data4 = new Date(date4);

  const diffInMilliseconds1 = data2 - data1;
  const diffInMilliseconds2 = data4 - data3;

  const diffInMilliseconds = diffInMilliseconds1 + diffInMilliseconds2

  const diffInMinutes = diffInMilliseconds / (1000 * 60);
  const hours = Math.floor(diffInMinutes / 60);
  const remainingMinutes = diffInMinutes % 60;
  const seconds = Math.floor((remainingMinutes - Math.floor(remainingMinutes)) * 60);
  return `${String(hours).padStart(2, '0')}h ${String(Math.floor(remainingMinutes)).padStart(2, '0')}m`;
}

function getDataFuturaPorDataEspecifica(data, dias) {
  data.setDate(data.getDate() + dias);
  return data;
}

export function fDataSemana(dataHora, maisdia) {
  const data = getDataFuturaPorDataEspecifica(new Date(dataHora), maisdia||0);
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

export function getCurrentDateTime(mesPassado) {
  let month = null
  const now = new Date();
  const year = now.getFullYear();
  mesPassado ? (
   month = String(now.getMonth()).padStart(2, '0')) : (
   month = String(now.getMonth() + 1).padStart(2, '0')
  ) // Adiciona zero à esquerda, se necessário
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
    return 0; 
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

export function formatarDataBR(dataNoFormatoBrasileiro) {
  const partes = dataNoFormatoBrasileiro.split('/');
  if (partes.length === 3) {
    const [dia, mes, ano] = partes;
    return `${ano}-${mes}-${dia}`;
  }
  return null; // Retornar null em caso de entrada inválida
}


export function subtrairDuracao(duracao1, duracao2) {
  // Função para converter duração no formato "hh 'h' mm 'm'" em minutos
  function converterParaMinutos(duracao) {
    const partes = duracao.split(' ');
    let minutos = 0;

    for (let i = 0; i < partes.length; i++) {
      if (partes[i].includes('h')) {
        minutos += parseInt(partes[i]) * 60;
      } else if (partes[i].includes('m')) {
        minutos += parseInt(partes[i]);
      }
    }

    return minutos;
  }

  // Converter ambas as durações em minutos
  const minutosDuracao1 = converterParaMinutos(duracao1);
  const minutosDuracao2 = converterParaMinutos(duracao2);

  // Realizar a subtração
  const diferencaMinutos = minutosDuracao1 - minutosDuracao2;

  // Função para formatar minutos em "hh 'h' mm 'm'"
  function formatarParaDuracao(minutos) {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    return `${horas+1}h ${minutosRestantes.toString().replace("-", "")}m`;
  }

  // Formatar o resultado de volta para o formato "hh 'h' mm 'm'"
  const resultadoFormatado = formatarParaDuracao(diferencaMinutos);

  return resultadoFormatado;
}