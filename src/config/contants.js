export const USUARIO = {
  NOME: { MIN: 8, MAX: 30 },
  EMAIL: { MIN: 8, MAX: 100 },
  TELEFONE: { MIN: 15, MAX: 15 },
  SENHA: { MIN: 8, MAX: 200 },
};

export const MENSAGEM = {
  EMAIL_EXISTENTE: "Já existe uma conta com o email informado.",
  SENHAS_DIFERENTES: "As senhas não coincidem.",
  EMAIL_OU_SENHA_INVALIDOS: "Email ou senha inválidos.",
  PRIVATE_KEY_AUSENTE: "PRIVATE_KEY não informada.",
  TOKEN_INVALIDO: "Token inválido.",
  ERRO_INTERNO: "Ocorreu um erro interno no servidor, por favor tente novamente mais tarde."
};

export const MENSAGEM_DTO = {
  USUARIO: {
    NOME: {
      OBRIGATORIO: "O nome é obrigatório.",
      STRING: "O nome deve ser uma string.",
      MIN: `O nome deve ter no mínimo ${USUARIO.NOME.MIN} caracteres.`,
      MAX: `O nome deve ter no máximo ${USUARIO.NOME.MAX} caracteres.`,
    },
    TELEFONE: {
      STRING: "O telefone deve ser uma string.",
      INVALIDO:
        "O telefone fornecido é inválido. Insira no formato (xx) xxxxx-xxxx.",
    },
    EMAIL: {
      OBRIGATORIO: "O email é obrigatório.",
      STRING: "O email deve ser uma string.",
      MIN: `O email deve ter no mínimo ${USUARIO.EMAIL.MIN} caracteres.`,
      MAX: `O email deve ter no máximo ${USUARIO.EMAIL.MAX} caracteres.`,
      INVALIDO: "O email fornecido é inválido.",
    },
    SENHA: {
      OBRIGATORIO: "A senha é obrigatória.",
      STRING: "A senha deve ser uma string.",
      MIN: `A senha deve ter no mínimo ${USUARIO.SENHA.MIN} caracteres.`,
      MAX: `A senha deve ter no máximo ${USUARIO.SENHA.MAX} caracteres.`,
    },
    CONFIRMAR_SENHA: {
      OBRIGATORIO: "O confirmarSenha é obrigatório.",
      STRING: "O confirmarSenha deve ser uma string.",
      NAO_COINCIDE: "O confirmarSenha deve ser igual a senha.",
    },
  },
};

export const DEFAULT = {
  EXPIRES_IN: "5h",
};

export const PRISMA_CODE_ERROR = {
  RESTRICAO_DE_UNICIDADE: "P2002",
};
