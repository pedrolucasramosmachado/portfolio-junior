# FinanceFlow Dash 💰

Uma solução completa de gestão financeira pessoal construída para oferecer visibilidade total sobre receitas, despesas e saúde financeira em tempo real.

![Preview do Projeto](https://images.unsplash.com/photo-1551288049-bbbda536ad89?auto=format&fit=crop&q=80&w=1000)

## 🎯 O Desafio
Muitos usuários têm dificuldade em manter o controle de suas finanças devido a interfaces complexas ou falta de integração entre o que é gasto e o que é planejado. O FinanceFlow foi projetado para ser intuitivo, rápido e robusto.

## 🚀 Tecnologias Utilizadas
- **Frontend:** React com Hooks avançados para gestão de estado gráfico.
- **Backend:** Node.js e Express para uma API ágil.
- **Banco de Dados:** SQLite (leve e eficiente para uso pessoal).
- **ORM:** Prisma para modelagem segura de dados e migrações simplificadas.
- **Gráficos:** Recharts para visualização dinâmica de fluxos de caixa.

## ✨ Funcionalidades Principais
- **Dashboard Holístico:** Visão geral de saldo, receitas e despesas do mês.
- **Categorização Inteligente:** Separação automática de gastos por categorias (Moradia, Lazer, Saúde, etc).
- **Histórico Completo:** Busca e filtragem de transações passadas.
- **Saldo Projetado:** Algoritmo simples que prevê o saldo final do mês com base em gastos recorrentes.

## 🛠️ Como Rodar Localmente
1. Clone o repositório.
2. Instale as dependências: `npm install` (na raiz, client e server).
3. Configure o arquivo `.env` no diretório `client` (já configurado com `VITE_API_URL`).
4. Configure o banco de dados: `npx prisma migrate dev` (no diretório `server`).
5. Inicie o servidor e o cliente: `npm run dev`.

---
*Este projeto foi totalmente **localizado para Português Brasileiro (PT-BR)**, incluindo o banco de dados (Prisma), servidor e interface, para garantir uma experiência consistente e profissional em portfólios locais.*

