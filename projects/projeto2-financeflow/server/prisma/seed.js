const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: 'Alimentação', icon: 'Utensils' },
    { name: 'Transporte', icon: 'Car' },
    { name: 'Lazer', icon: 'Gamepad' },
    { name: 'Saúde', icon: 'HeartPulse' },
    { name: 'Educação', icon: 'GraduationCap' },
    { name: 'Salário', icon: 'DollarSign' },
    { name: 'Outros', icon: 'MoreHorizontal' },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
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
