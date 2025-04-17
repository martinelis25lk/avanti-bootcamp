export function validarTelefone(telefone) {
  const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return telefoneRegex.test(telefone);
}
