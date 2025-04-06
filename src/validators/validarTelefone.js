export function validarTelefone(telefone) {
  const phoneNumberRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return phoneNumberRegex.test(telefone);
}
