import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function criarItem(itemData) {
  try {
    const newItem = await prisma.item.create({
      data: itemData,
    });
    console.log('Novo item criado:', newItem);
    return newItem;
  } catch (error) {
    console.error('Erro ao criar item:', error);
    throw error; 
  }
}

async function buscarTodosItensComCategorias() {
  try {
    const todosItens = await prisma.item.findMany({
      include: { categorias: true },
    });
    console.log('\nTodos os itens:', todosItens);
  } catch (error) {
    console.error('Erro ao buscar todos os itens:', error);
  }
}

async function buscarItemPorIdComCategorias(id) {
  try {
    const itemUnico = await prisma.item.findUnique({
      where: { id },
      include: { categorias: true },
    });
    console.log('\nItem encontrado pelo ID:', itemUnico);
  } catch (error) {
    console.error('Erro ao buscar item por ID:', error);
  }
}

async function buscarItemPorCodigo(codigo) {
  try {
    const itemUnico = await prisma.item.findUnique({
      where: { codigo },
      include: { categorias: true },
    });
    console.log('\nItem encontrado pelo Código:', itemUnico);
  } catch (error) {
    console.error('Erro ao buscar item por Código:', error);
  }
}

async function main() {
  try {
    const itemData = {
      usuario_id: 1,
      nome: 'Meu Item Dinâmico',
      data_ocorrido: new Date(),
      estado: 'CE',
      cidade: 'Fortaleza',
      bairro: 'Henrique Jorge',
      cep: '60000-000',
      logradouro: 'Rua guarani, 1507',
      status: 'ativo',
      codigo: 'ITEM-002',
      foto: '/caminho/para/outra/foto.jpg',
      categorias: {
        connect: [
          { nome: 'Celular' }, 
          { nome: 'Eletrônicos' },
        ],
      },
    };

    const novoItem = await criarItem(itemData);
    if (novoItem) {
      await buscarTodosItensComCategorias();
      await buscarItemPorIdComCategorias(novoItem.id);
      await buscarItemPorCodigo('ITEM-002');
    }

  } catch (error) {
    console.error('Erro geral:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();