-- CreateEnum
CREATE TYPE "Prioridade" AS ENUM ('UM', 'DOIS', 'TRES');

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "foto" TEXT,
    "data_ocorrido" DATE NOT NULL,
    "data_entregue" DATE,
    "email" VARCHAR(100),
    "telefone" VARCHAR(15),
    "estado" VARCHAR(30) NOT NULL,
    "cidade" VARCHAR(30) NOT NULL,
    "bairro" VARCHAR(30) NOT NULL,
    "logradouro" VARCHAR(100) NOT NULL,
    "numero" INTEGER,
    "status" VARCHAR(10) NOT NULL,
    "created_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(6) NOT NULL,
    "prioridade" "Prioridade",
    "categoriaId" INTEGER,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
