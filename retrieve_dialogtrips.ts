import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const dialogtrips = await prisma.trip.findMany({
        select: {
            id: true,
            name: true,
            startDate: true,
            users: {
              select: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        shares: true,
                    }
                },
              },
            },
            expenses: {
              select: {
                date:true,
                location:true,
                category: {
                    select: {
                        icon: true,
                        name: true,
                    }
                },
                amount:true,
                currency:true,
                description:true,
                userId:true,
                user: {
                    select: {
                        name:true,
                    }
                }
            },
            },
          },
        })
    console.dir(dialogtrips, { depth: null })
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
