import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const DEFAULT_USER_EMAIL = 'pratik@studysync.ai'

export async function getDefaultUser() {
  let user = await prisma.user.findUnique({
    where: { email: DEFAULT_USER_EMAIL },
  })
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Pratik',
        email: DEFAULT_USER_EMAIL,
      },
    })
  }
  return user;
}
