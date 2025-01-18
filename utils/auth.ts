import { auth } from '@clerk/nextjs/server';
import { prisma } from './db';
import { redirect } from 'next/navigation';

export const getUserByClerkId = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return redirect('/new-user');
  }

  return user;
};
