import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.categoria.createMany({
    data: [
      { nome: "Outro", prioridade: 1 },
      { nome: "Documento", prioridade: 2 },
      { nome: "Relógio", prioridade: 1 },
      { nome: "Roupa", prioridade: 1 },
      { nome: "Eletrônico", prioridade: 1 },
      { nome: "Celular", prioridade: 3 },
      { nome: "Câmera", prioridade: 2 },
      { nome: "Notebook", prioridade: 3 },
      { nome: "Tablet", prioridade: 3 },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((error) => {
    console.error(error);

    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
