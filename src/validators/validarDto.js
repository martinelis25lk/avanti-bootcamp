export async function validarDto(dto, response) {
  const erros = dto.validar();
  if (erros.length > 0) {
    response.status(400).send({ erros });
    return false;
  }
  return true;
}
