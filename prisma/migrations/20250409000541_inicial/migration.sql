-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(15),
    "senha" VARCHAR(200) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "prioridade" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "foto_url" TEXT,
    "data_ocorrido" TIMESTAMP NOT NULL,
    "data_entregue" TIMESTAMP,
    "email" VARCHAR(100),
    "telefone" VARCHAR(15),
    "estado" VARCHAR(30) NOT NULL,
    "cidade" VARCHAR(30) NOT NULL,
    "bairro" VARCHAR(30) NOT NULL,
    "logradouro" VARCHAR(100) NOT NULL,
    "numero" INTEGER,
    "status" VARCHAR(10) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
