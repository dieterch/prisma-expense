import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const tripsWithExpenses = await prisma.trip.findMany({
        include: {
            expenses: {
                select: {
                    date: true,
                    user: {
                        select: {
                            name: true,
                        }
                    },
                    description: true,
                    amount: true,
                    currency: true,
                    category: {
                        select: {
                            name: true,
                            icon: true
                        }
                    }
                }
            },
        },
    })
    console.dir(tripsWithExpenses, { depth: null })
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
