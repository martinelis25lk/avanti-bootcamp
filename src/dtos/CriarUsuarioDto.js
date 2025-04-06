import { MENSAGEM_DTO, USUARIO } from "../config/contants.js";
import { validarEmail } from "../validators/validarEmail.js";
import { validarTelefone } from "../validators/validarTelefone.js";

export class CriarUsuarioDto {
  constructor({ nome, email, telefone, senha, confirmarSenha }) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.senha = senha;
    this.confirmarSenha = confirmarSenha;
  }

  validar() {
    const erros = [];

    if (!this.nome) {
      erros.push({
        campo: "nome",
        mensagem: MENSAGEM_DTO.USUARIO.NOME.OBRIGATORIO,
      });
    } else if (typeof this.nome !== "string") {
      erros.push({
        campo: "nome",
        mensagem: MENSAGEM_DTO.USUARIO.NOME.STRING,
      });
    } else if (this.nome.length < USUARIO.NOME.MIN) {
      erros.push({
        campo: "nome",
        mensagem: MENSAGEM_DTO.USUARIO.NOME.MIN,
      });
    } else if (this.nome.length > USUARIO.NOME.MAX) {
      erros.push({
        campo: "nome",
        mensagem: MENSAGEM_DTO.USUARIO.NOME.MAX,
      });
    }

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
    } else if (this.email.length < USUARIO.EMAIL.MIN) {
      erros.push({
        campo: "email",
        mensagem: MENSAGEM_DTO.USUARIO.EMAIL.MIN,
      });
    } else if (this.nome.length > USUARIO.NOME.MAX) {
      erros.push({
        campo: "email",
        mensagem: MENSAGEM_DTO.USUARIO.EMAIL.MAX,
      });
    }

    if (this.telefone) {
      if (typeof this.telefone !== "string") {
        erros.push({
          campo: "telefone",
          mensagem: MENSAGEM_DTO.USUARIO.TELEFONE.STRING,
        });
      } else if (!validarTelefone(this.telefone)) {
        erros.push({
          campo: "telefone",
          mensagem: MENSAGEM_DTO.USUARIO.TELEFONE.INVALIDO,
        });
      }
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
    } else if (this.senha.length < USUARIO.SENHA.MIN) {
      erros.push({
        campo: "senha",
        mensagem: MENSAGEM_DTO.USUARIO.SENHA.MIN,
      });
    } else if (this.senha.length > USUARIO.SENHA.MAX) {
      erros.push({
        campo: "senha",
        mensagem: MENSAGEM_DTO.USUARIO.SENHA.MAX,
      });
    }

    if (!this.confirmarSenha) {
      erros.push({
        campo: "confirmarSenha",
        mensagem: MENSAGEM_DTO.USUARIO.CONFIRMAR_SENHA.OBRIGATORIO,
      });
    } else if (typeof this.confirmarSenha !== "string") {
      erros.push({
        campo: "confirmarSenha",
        mensagem: MENSAGEM_DTO.USUARIO.CONFIRMAR_SENHA.STRING,
      });
    } else if (this.senha !== this.confirmarSenha) {
      erros.push({
        campo: "confirmarSenha",
        mensagem: MENSAGEM_DTO.USUARIO.CONFIRMAR_SENHA.NAO_COINCIDE,
      });
    }

    return erros;
  }
}
