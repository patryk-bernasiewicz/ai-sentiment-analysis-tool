import { prisma } from '@/utils/db';
import { currentUser, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const createNewUser = async () => {
  const user = (await currentUser()) as User;

  if (!user) {
    throw new Error('No user found');
  }

  const match = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!match) {
    const email = user.emailAddresses.find(
      (e) => e.id === user.primaryEmailAddressId,
    );
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: email?.emailAddress || '',
      },
    });
  }

  redirect('/sentiments');
};

export default async function NewUserPage() {
  await createNewUser();

  return <div />;
}
