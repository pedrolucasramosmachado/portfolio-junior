const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const categorias = [
    { nome: 'Alimentação', icone: 'Utensils' },
    { nome: 'Transporte', icone: 'Car' },
    { nome: 'Lazer', icone: 'Gamepad' },
    { nome: 'Saúde', icone: 'HeartPulse' },
    { nome: 'Educação', icone: 'GraduationCap' },
    { nome: 'Salário', icone: 'DollarSign' },
    { nome: 'Outros', icone: 'MoreHorizontal' },
  ]

  for (const categoria of categorias) {
    await prisma.categoria.upsert({
      where: { nome: categoria.nome },
      update: {},
      create: categoria,
    })
  }

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
