import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const expenses = await prisma.expense.findMany()
    console.log(expenses)
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
