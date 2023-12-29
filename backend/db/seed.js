import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { user: User } = prisma

async function main() {
    await User.create({
        data: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            hashedPassword: '2a10d09799432773c347723882934823478234782347823478234782347823478234',
            salt: 'd09799432773c347723882934823478234782347823478234782347823478234',
            createdAt: '2023-12-12T12:00:00Z',
            updatedAt: '2023-12-12T12:00:00Z',
        },
    })
}

main()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
