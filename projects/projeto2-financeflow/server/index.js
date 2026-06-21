const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Listar todas as transações com categorias
app.get('/api/transactions', async (req, res) => {
  try {
    const transacoes = await prisma.transacao.findMany({
      include: { categoria: true },
      orderBy: { data: 'desc' },
    });
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
});

// Listar todas as categorias
app.get('/api/categories', async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

// Criar uma transação
app.post('/api/transactions', async (req, res) => {
  const { descricao, valor, tipo, categoriaId } = req.body;
  try {
    const transacao = await prisma.transacao.create({
      data: {
        descricao,
        valor: parseFloat(valor),
        tipo,
        categoriaId: parseInt(categoriaId),
      },
      include: { categoria: true },
    });
    res.status(201).json(transacao);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar transação' });
  }
});

// Deletar uma transação
app.delete('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.transacao.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar transação' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor FinanceFlow rodando em http://localhost:${PORT}`);
});
