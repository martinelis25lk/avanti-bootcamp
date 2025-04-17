import { MENSAGEM_DTO } from "../config/contants.js";
import { validarEmail } from "../validators/validarEmail.js";

export class AutenticarUsuarioDto {
  constructor({ email, senha }) {
    this.email = email;
    this.senha = senha;
  }

  validar() {
    const erros = [];

    if (!this.email) {
      erros.push({
        campo: "email",
        mensagem: MENSAGEM_DTO.USUARIO.EMAIL.OBRIGATORIO,
      });
    } else if (typeof this.email !== "string") {
      erros.push({
        campo: "email",
        mensagem: MENSAGEM_DTO.USUARIO.EMAIL.STRING,
      });
    } else if (!validarEmail(this.email)) {
      erros.push({
        campo: "email",
        mensagem: MENSAGEM_DTO.USUARIO.EMAIL.INVALIDO,
      });
    }

    if (!this.senha) {
      erros.push({
        campo: "senha",
        mensagem: MENSAGEM_DTO.USUARIO.SENHA.OBRIGATORIO,
      });
    } else if (typeof this.senha !== "string") {
      erros.push({
        campo: "senha",
        mensagem: MENSAGEM_DTO.USUARIO.SENHA.STRING,
      });
    }

    return erros;
  }
}
