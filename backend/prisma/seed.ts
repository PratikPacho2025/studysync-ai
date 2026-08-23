import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database reset & seed...')

  // 1. Create Default User (Pratik)
  const user = await prisma.user.upsert({
    where: { email: 'pratik@studysync.ai' },
    update: {},
    create: {
      name: 'Pratik',
      email: 'pratik@studysync.ai',
    },
  })
  console.log(`👤 Created/Verified User: ${user.name} (ID: ${user.id})`)

  // Clean existing related data to ensure fresh seed
  await prisma.topic.deleteMany({})
  await prisma.subject.deleteMany({})
  await prisma.lecture.deleteMany({})
  await prisma.attendanceRecord.deleteMany({})
  await prisma.habit.deleteMany({})
  await prisma.goal.deleteMany({})
  await prisma.studyTask.deleteMany({})
  await prisma.revisionSession.deleteMany({})
  await prisma.quizQuestion.deleteMany({})
  await prisma.quiz.deleteMany({})
  await prisma.quizAttempt.deleteMany({})
  await prisma.procrastinationState.deleteMany({})
  await prisma.delayedTask.deleteMany({})

  console.log('🧹 Cleaned up existing database records. Ready for fresh data!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
