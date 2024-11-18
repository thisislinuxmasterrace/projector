import { faker } from '@faker-js/faker';
import {
  Priority,
  PrismaClient,
  Project,
  Size,
  Status,
  User,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function fake(prisma: PrismaClient) {
  const users: User[] = [];

  console.log('generating users...');

  for (let i = 0; i < 250; i++) {
    users.push(
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          passwordHash: await bcrypt.hash(faker.string.alphanumeric(16), 10),
        },
      }),
    );
  }

  const mainUserPassword = faker.string.alphanumeric(16);

  const mainUser = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      passwordHash: await bcrypt.hash(mainUserPassword, 10),
    },
  });

  console.log(`main user data: ${mainUser.email} ${mainUserPassword}`);

  const projectsToInviteTo: Project[] = [];
  const projects: Project[] = [];

  console.log('generating projects...');

  for (let i = 1; i < 11; i++) {
    const project = await prisma.project.create({
      data: {
        name: faker.commerce.productName(),
      },
    });

    if (i % 2 === 0) {
      projectsToInviteTo.push(project);
    } else {
      projects.push(project);
    }

    await prisma.userProject.create({
      data: {
        projectId: project.id,
        userId: users[i].id,
        role: 'owner',
      },
    });
  }

  for (let i = 0; i < 5; i++) {
    await prisma.projectInvite.create({
      data: {
        projectId: projectsToInviteTo[i].id,
        userId: mainUser.id,
        role: i % 2 === 0 ? 'owner' : 'maintainer',
      },
    });
  }

  let offset = 100;

  console.log('generating tasks...');

  for (const project of projects) {
    const projectUsers = [];

    projectUsers.push(
      await prisma.userProject.create({
        data: {
          userId: mainUser.id,
          projectId: project.id,
          role: offset % 2 === 0 ? 'owner' : 'maintainer',
        },
      }),
    );

    for (let i = 100; i < 115; i++) {
      projectUsers.push(
        await prisma.userProject.create({
          data: {
            userId: users[i].id,
            projectId: project.id,
            role: offset % 2 === 0 ? 'owner' : 'maintainer',
          },
        }),
      );

      offset += 1;
    }

    for (let i = 200; i < 215; i++) {
      await prisma.projectInvite.create({
        data: {
          userId: users[i].id,
          projectId: project.id,
          role: offset % 2 === 0 ? 'owner' : 'maintainer',
        },
      });

      offset += 1;
    }

    // tasks that are not done
    for (let i = 0; i < 3; i++) {
      const taskName = faker.commerce.productName();

      const task = await prisma.task.create({
        data: {
          name: taskName,
          projectId: project.id,
          description: taskName + ' description...',
          status: offset % 2 == 0 ? Status.inProgress : Status.todo,
          priority: Object.values(Priority)[offset % 4],
          size: Object.values(Size)[offset % 6],
          createdAt: faker.date.recent(),
          updatedAt: offset % 2 === 0 ? new Date() : null,
          expectedDoneAt: offset % 2 === 0 ? faker.date.soon() : null,
          assignedToUserId: mainUser.id,
        },
      });

      offset += 1;

      for (let i = 0; i < 10; i++) {
        await prisma.comment.create({
          data: {
            userId: projectUsers[i].userId,
            content: `Here's a random book that describes this task: ${faker.book.title()}`,
            taskId: task.id,
            createdAt: new Date(),
            projectId: project.id,
          },
        });
      }
    }

    for (let i = 0; i < 10; i++) {
      const taskName = faker.commerce.productName();

      const task = await prisma.task.create({
        data: {
          name: taskName,
          projectId: project.id,
          description: `${taskName} description... Here is also a book that describes this task: ${faker.book.title()}`,
          status: 'done',
          priority: Object.values(Priority)[offset % 4],
          size: Object.values(Size)[offset % 6],
          createdAt: faker.date.recent(),
          updatedAt: offset % 2 === 0 ? new Date() : null,
          expectedDoneAt: offset % 2 === 0 ? faker.date.soon() : null,
          doneAt: new Date(),
          assignedToUserId: mainUser.id,
        },
      });

      offset += 1;

      for (let i = 0; i < 10; i++) {
        await prisma.comment.create({
          data: {
            userId: projectUsers[i].userId,
            content: `Here's a random book that describes this task: ${faker.book.title()}`,
            taskId: task.id,
            createdAt: faker.date.recent(),
            projectId: project.id,
            updatedAt: offset % 2 === 0 ? new Date() : null,
          },
        });
        offset += 1;
      }
    }

    for (const projectUser of projectUsers) {
      const taskName = faker.commerce.productName();

      const task = await prisma.task.create({
        data: {
          name: taskName,
          projectId: project.id,
          description: `${taskName} description... Here is also a book that describes this task: ${faker.book.title()}`,
          status: Object.values(Status)[offset % 3],
          priority: Object.values(Priority)[offset % 4],
          size: Object.values(Size)[offset % 6],
          createdAt: faker.date.recent(),
          updatedAt: offset % 2 === 0 ? new Date() : null,
          expectedDoneAt: offset % 2 === 0 ? faker.date.soon() : null,
          assignedToUserId: projectUser.userId,
        },
      });

      offset += 1;

      for (let i = 0; i < 10; i++) {
        await prisma.comment.create({
          data: {
            userId: projectUsers[i].userId,
            content: `Here's a random book that describes this task: ${faker.book.title()}`,
            taskId: task.id,
            createdAt: faker.date.recent(),
            projectId: project.id,
            updatedAt: offset % 2 === 0 ? new Date() : null,
          },
        });
        offset += 1;
      }
    }
  }
}
