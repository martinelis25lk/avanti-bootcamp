export function validarData(data) {
  const dataRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

  if (!dataRegex.test(data)) {
    return false;
  }

  const [parteData, parteHorario] = data.split(" ");
  const [ano, mes, dia] = parteData.split("-").map(Number);
  const [hora, minuto] = parteHorario.split(":").map(Number);

  if (mes < 1 || mes > 12) {
    return false;
  }

  const diasNoMes = new Date(ano, mes, 0).getDate();
  if (dia < 1 || dia > diasNoMes) {
    return false;
  }

  if (hora < 0 || hora > 23 || minuto < 0 || minuto > 59) {
    return false;
  }

  return true;
}
