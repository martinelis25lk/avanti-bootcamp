export const USUARIO = {
  NOME: { MIN: 8, MAX: 30 },
  EMAIL: { MIN: 8, MAX: 100 },
  TELEFONE: { MIN: 15, MAX: 15 },
  SENHA: { MIN: 8, MAX: 200 },
};

export const ITEM = {
  NOME: { MIN: 3, MAX: 30 },
  EMAIL: { MIN: 8, MAX: 100 },
  TELEFONE: { MIN: 15, MAX: 15 },
  ESTADO: { MIN: 1, MAX: 30 },
  CIDADE: { MIN: 1, MAX: 30 },
  BAIRRO: { MIN: 1, MAX: 30 },
  LOGRADOURO: { MIN: 1, MAX: 100 },
  STATUS: {
    PERDIDO: "Perdido",
    ENCONTRADO: "Encontrado",
  },
};

export const MENSAGEM = {
  EMAIL_EXISTENTE: "Já existe uma conta com o email informado.",
  SENHAS_DIFERENTES: "As senhas não coincidem.",
  EMAIL_OU_SENHA_INVALIDOS: "Email ou senha inválidos.",
  PRIVATE_KEY_AUSENTE: "PRIVATE_KEY não informada.",
  TOKEN_INVALIDO: "Token inválido.",
  ERRO_INTERNO: "Ocorreu um erro interno no servidor.",
  USUARIO_ID_NAO_INFORMADO: "usuarioId não foi informado.",
  ITEM_ID_NAO_INFORMADO: "O itemId não foi informado.",
  USUARIO_ID_NAO_ENCONTRADO: (usuarioId) =>
    `O usuário com id ${usuarioId} não foi encontrado.`,
  ITEM_ID_NAO_ENCONTRADO: (itemId) =>
    `O item com id ${itemId} não foi encontrado.`,
  CATEGORIA_ID_NAO_ENCONTRADO: (categoriaId) =>
    `A categoria com id ${categoriaId} não foi encontrada.`,
  NENHUMA_IMAGEM_ENVIADA: "Nenhuma imagem foi enviada.",
  UPLOAD_IMAGEM_SUCESSO: "Upload de imagem realizado com sucesso.",
};

export const MENSAGEM_DTO = {
  USUARIO: {
    NOME: {
      OBRIGATORIO: "O 'nome' é obrigatório.",
      STRING: "O 'nome' deve ser uma string.",
      MIN: `O 'nome' deve ter no mínimo ${USUARIO.NOME.MIN} caracteres.`,
      MAX: `O 'nome' deve ter no máximo ${USUARIO.NOME.MAX} caracteres.`,
    },
    TELEFONE: {
      STRING: "O 'telefone' deve ser uma string.",
      INVALIDO:
        "O 'telefone' fornecido é inválido. Insira no formato (xx) xxxxx-xxxx.",
    },
    EMAIL: {
      OBRIGATORIO: "O 'email' é obrigatório.",
      STRING: "O 'email' deve ser uma string.",
      MIN: `O 'email' deve ter no mínimo ${USUARIO.EMAIL.MIN} caracteres.`,
      MAX: `O 'email' deve ter no máximo ${USUARIO.EMAIL.MAX} caracteres.`,
      INVALIDO: "O 'email' fornecido é inválido.",
    },
    SENHA: {
      OBRIGATORIO: "O 'senha' é obrigatório.",
      STRING: "O 'senha' deve ser uma string.",
      MIN: `O 'senha' deve ter no mínimo ${USUARIO.SENHA.MIN} caracteres.`,
      MAX: `O 'senha' deve ter no máximo ${USUARIO.SENHA.MAX} caracteres.`,
    },
    CONFIRMAR_SENHA: {
      OBRIGATORIO: "O 'confirmarSenha' é obrigatório.",
      STRING: "O 'confirmarSenha' deve ser uma string.",
      NAO_COINCIDE: "O 'confirmarSenha' deve ser igual ao 'senha'.",
    },
  },
  ITEM: {
    CATEGORIA_ID: {
      OBRIGATORIO: "O 'categoria_id' é obrigatório.",
      INTEIRO_POSITIVO: "O 'categoria_id' deve ser um número inteiro positivo.",
    },
    NOME: {
      OBRIGATORIO: "O 'nome' é obrigatório.",
      STRING: "O 'nome' deve ser uma string.",
      MIN: `O 'nome' deve ter no mínimo ${ITEM.NOME.MIN} caracteres.`,
      MAX: `O 'nome' deve ter no máximo ${ITEM.NOME.MAX} caracteres.`,
    },
    FOTO_URL: {
      STRING: "O 'foto_url' deve ser uma string.",
    },
    DATA_OCORRIDO: {
      OBRIGATORIO: "O 'data_ocorrido' é obrigatório.",
      STRING: "O 'data_ocorrido' deve ser uma string.",
      INVALIDO:
        "O 'data_ocorrido' fornecido é inválido. Insira no formato YYYY-MM-DD HH:mm.",
    },
    DATA_ENTREGUE: {
      STRING: "O 'data_entregue' deve ser uma string.",
      INVALIDO:
        "O 'data_entregue' fornecido é inválido. Insira no formato YYYY-MM-DD HH:mm.",
    },
    EMAIL: {
      STRING: "O 'email' deve ser uma string.",
      MIN: `O 'email' deve ter no mínimo ${ITEM.EMAIL.MIN} caracteres.`,
      MAX: `O 'email' deve ter no máximo ${ITEM.EMAIL.MAX} caracteres.`,
      INVALIDO: "O 'email' fornecido é inválido.",
    },
    TELEFONE: {
      STRING: "O 'telefone' deve ser uma string.",
      INVALIDO:
        "O 'telefone' fornecido é inválido. Insira no formato (xx) xxxxx-xxxx.",
    },
    ESTADO: {
      OBRIGATORIO: "O 'estado' é obrigatório.",
      STRING: "O 'estado' deve ser uma string.",
      MIN: `O 'estado' deve ter no mínimo ${ITEM.ESTADO.MIN} caracteres.`,
      MAX: `O 'estado' deve ter no máximo ${ITEM.ESTADO.MAX} caracteres.`,
    },
    CIDADE: {
      OBRIGATORIO: "O 'cidade' é obrigatório.",
      STRING: "O 'cidade' deve ser uma string.",
      MIN: `O 'cidade' deve ter no mínimo ${ITEM.CIDADE.MIN} caracteres.`,
      MAX: `O 'cidade' deve ter no máximo ${ITEM.CIDADE.MAX} caracteres.`,
    },
    BAIRRO: {
      OBRIGATORIO: "O 'bairro' é obrigatório.",
      STRING: "O 'bairro' deve ser uma string.",
      MIN: `O 'bairro' deve ter no mínimo ${ITEM.BAIRRO.MIN} caracteres.`,
      MAX: `O 'bairro' deve ter no máximo ${ITEM.BAIRRO.MAX} caracteres.`,
    },
    LOGRADOURO: {
      OBRIGATORIO: "O 'logradouro' é obrigatório.",
      STRING: "O 'logradouro' deve ser uma string.",
      MIN: `O 'logradouro' deve ter no mínimo ${ITEM.LOGRADOURO.MIN} caracteres.`,
      MAX: `O 'logradouro' deve ter no máximo ${ITEM.LOGRADOURO.MAX} caracteres.`,
    },
    NUMERO: {
      INTEIRO_NAO_NEGATIVO:
        "O 'numero' deve ser um número inteiro não negativo.",
    },
    STATUS: {
      OBRIGATORIO: "O 'status' é obrigatório.",
      STRING: "O 'status' deve ser uma string.",
      INVALIDO: `O 'status' deve ser ${ITEM.STATUS.PERDIDO} ou ${ITEM.STATUS.ENCONTRADO}.`,
    },
    CONTATO_OBRIGATORIO:
      "O contato é obrigatório. Informe o 'email' ou 'telefone'.",
  },
};

export const DEFAULT = {
  EXPIRES_IN: "5h",
  APP_URL: "localhost:3000"
};

export const PRISMA_CODE_ERROR = {
  RESTRICAO_DE_UNICIDADE: "P2002",
};
