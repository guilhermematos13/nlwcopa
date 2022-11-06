import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            avatarUrl: 'https://github.com/guilhermematos13'
        }
    })

    const pool = await prisma.pool.create({
        data:{
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-04T16:00:00.705Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-05T16:00:00.705Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',
            
            guesses: {
                create: {
                    firstTeamPoints: 1 ,
                    secondTeamPoints: 0,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })

    
}

main()