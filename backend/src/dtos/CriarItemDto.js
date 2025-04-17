import { MENSAGEM_DTO, ITEM } from "../config/contants.js";
import { validarEmail } from "../validators/validarEmail.js";
import { validarTelefone } from "../validators/validarTelefone.js";
import { validarData } from "../validators/validarData.js";

export class CriarItemDto {
  constructor({
    categoria_id,
    nome,
    foto_url,
    data_ocorrido,
    email,
    telefone,
    estado,
    cidade,
    bairro,
    logradouro,
    numero,
    status,
  }) {
    this.categoria_id = categoria_id;
    this.nome = nome;
    this.foto_url = foto_url;
    this.data_ocorrido = data_ocorrido;
    this.email = email;
    this.telefone = telefone;
    this.estado = estado;
    this.cidade = cidade;
    this.bairro = bairro;
    this.logradouro = logradouro;
    this.numero = numero;
    this.status = status;
  }

  validar() {
    const erros = [];

    if (!this.categoria_id) {
      erros.push({
        campo: "categoria_id",
        mensagem: MENSAGEM_DTO.ITEM.CATEGORIA_ID.OBRIGATORIO,
      });
    } else if (!Number.isInteger(this.categoria_id) || this.categoria_id <= 0) {
      erros.push({
        campo: "categoria_id",
        mensagem: MENSAGEM_DTO.ITEM.CATEGORIA_ID.INTEIRO_POSITIVO,
      });
    }

    if (!this.nome) {
      erros.push({
        campo: "nome",
        mensagem: MENSAGEM_DTO.ITEM.NOME.OBRIGATORIO,
      });
    } else if (typeof this.nome !== "string") {
      erros.push({
        campo: "nome",
        mensagem: MENSAGEM_DTO.ITEM.NOME.STRING,
      });
    } else if (this.nome.length < ITEM.NOME.MIN) {
      erros.push({
        campo: "nome",
        mensagem: MENSAGEM_DTO.ITEM.NOME.MIN,
      });
    } else if (this.nome.length > ITEM.NOME.MAX) {
      erros.push({
        campo: "nome",
        mensagem: MENSAGEM_DTO.ITEM.NOME.MAX,
      });
    }

    if (this.foto_url) {
      if (typeof this.foto_url !== "string") {
        erros.push({
          campo: "foto_url",
          mensagem: MENSAGEM_DTO.ITEM.FOTO_URL.STRING,
        });
      }
    }

    if (!this.data_ocorrido) {
      erros.push({
        campo: "data_ocorrido",
        mensagem: MENSAGEM_DTO.ITEM.DATA_OCORRIDO.OBRIGATORIO,
      });
    } else if (typeof this.data_ocorrido !== "string") {
      erros.push({
        campo: "data_ocorrido",
        mensagem: MENSAGEM_DTO.ITEM.DATA_OCORRIDO.STRING,
      });
    } else if (!validarData(this.data_ocorrido)) {
      erros.push({
        campo: "data_ocorrido",
        mensagem: MENSAGEM_DTO.ITEM.DATA_OCORRIDO.INVALIDO,
      });
    }

    if (this.email) {
      if (typeof this.email !== "string") {
        erros.push({
          campo: "email",
          mensagem: MENSAGEM_DTO.ITEM.EMAIL.STRING,
        });
      } else if (!validarEmail(this.email)) {
        erros.push({
          campo: "email",
          mensagem: MENSAGEM_DTO.ITEM.EMAIL.INVALIDO,
        });
      } else if (this.email.length < ITEM.EMAIL.MIN) {
        erros.push({
          campo: "email",
          mensagem: MENSAGEM_DTO.ITEM.EMAIL.MIN,
        });
      } else if (this.email.length > ITEM.EMAIL.MAX) {
        erros.push({
          campo: "email",
          mensagem: MENSAGEM_DTO.ITEM.EMAIL.MAX,
        });
      }
    }

    if (this.telefone) {
      if (typeof this.telefone !== "string") {
        erros.push({
          campo: "telefone",
          mensagem: MENSAGEM_DTO.ITEM.TELEFONE.STRING,
        });
      } else if (!validarTelefone(this.telefone)) {
        erros.push({
          campo: "telefone",
          mensagem: MENSAGEM_DTO.ITEM.TELEFONE.INVALIDO,
        });
      }
    }

    if (!this.estado) {
      erros.push({
        campo: "estado",
        mensagem: MENSAGEM_DTO.ITEM.ESTADO.OBRIGATORIO,
      });
    } else if (typeof this.estado !== "string") {
      erros.push({
        campo: "estado",
        mensagem: MENSAGEM_DTO.ITEM.ESTADO.STRING,
      });
    } else if (this.estado.length < ITEM.ESTADO.MIN) {
      erros.push({
        campo: "estado",
        mensagem: MENSAGEM_DTO.ITEM.ESTADO.MIN,
      });
    } else if (this.estado.length > ITEM.ESTADO.MAX) {
      erros.push({
        campo: "estado",
        mensagem: MENSAGEM_DTO.ITEM.ESTADO.MAX,
      });
    }

    if (!this.cidade) {
      erros.push({
        campo: "cidade",
        mensagem: MENSAGEM_DTO.ITEM.CIDADE.OBRIGATORIO,
      });
    } else if (typeof this.cidade !== "string") {
      erros.push({
        campo: "cidade",
        mensagem: MENSAGEM_DTO.ITEM.CIDADE.STRING,
      });
    } else if (this.cidade.length < ITEM.CIDADE.MIN) {
      erros.push({
        campo: "cidade",
        mensagem: MENSAGEM_DTO.ITEM.CIDADE.MIN,
      });
    } else if (this.cidade.length > ITEM.CIDADE.MAX) {
      erros.push({
        campo: "cidade",
        mensagem: MENSAGEM_DTO.ITEM.CIDADE.MAX,
      });
    }

    if (!this.bairro) {
      erros.push({
        campo: "bairro",
        mensagem: MENSAGEM_DTO.ITEM.BAIRRO.OBRIGATORIO,
      });
    } else if (typeof this.bairro !== "string") {
      erros.push({
        campo: "bairro",
        mensagem: MENSAGEM_DTO.ITEM.BAIRRO.STRING,
      });
    } else if (this.bairro.length < ITEM.BAIRRO.MIN) {
      erros.push({
        campo: "bairro",
        mensagem: MENSAGEM_DTO.ITEM.BAIRRO.MIN,
      });
    } else if (this.bairro.length > ITEM.BAIRRO.MAX) {
      erros.push({
        campo: "bairro",
        mensagem: MENSAGEM_DTO.ITEM.BAIRRO.MAX,
      });
    }

    if (!this.logradouro) {
      erros.push({
        campo: "logradouro",
        mensagem: MENSAGEM_DTO.ITEM.LOGRADOURO.OBRIGATORIO,
      });
    } else if (typeof this.logradouro !== "string") {
      erros.push({
        campo: "logradouro",
        mensagem: MENSAGEM_DTO.ITEM.LOGRADOURO.STRING,
      });
    } else if (this.logradouro.length < ITEM.LOGRADOURO.MIN) {
      erros.push({
        campo: "logradouro",
        mensagem: MENSAGEM_DTO.ITEM.LOGRADOURO.MIN,
      });
    } else if (this.logradouro.length > ITEM.LOGRADOURO.MAX) {
      erros.push({
        campo: "logradouro",
        mensagem: MENSAGEM_DTO.ITEM.LOGRADOURO.MAX,
      });
    }

    if (this.numero) {
      if (!Number.isInteger(this.numero) || this.numero < 0) {
        erros.push({
          campo: "numero",
          mensagem: MENSAGEM_DTO.ITEM.NUMERO.INTEIRO_NAO_NEGATIVO,
        });
      }
    }

    if (!this.status) {
      erros.push({
        campo: "status",
        mensagem: MENSAGEM_DTO.ITEM.STATUS.OBRIGATORIO,
      });
    } else if (typeof this.status !== "string") {
      erros.push({
        campo: "status",
        mensagem: MENSAGEM_DTO.ITEM.STATUS.STRING,
      });
    } else if (
      this.status !== ITEM.STATUS.PERDIDO &&
      this.status !== ITEM.STATUS.ENCONTRADO
    ) {
      erros.push({
        campo: "status",
        mensagem: MENSAGEM_DTO.ITEM.STATUS.INVALIDO,
      });
    }

    if (!this.email && !this.telefone) {
      erros.push({
        campo: "*",
        mensagem: MENSAGEM_DTO.ITEM.CONTATO_OBRIGATORIO,
      });
    }

    return erros;
  }
}
