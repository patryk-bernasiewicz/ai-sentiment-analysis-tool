import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const user = await getUserByClerkId();

  const entry = await prisma.sentimentEntry.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      content: 'Write some comment here',
    },
  });

  revalidatePath('/sentiments');

  return NextResponse.json({ data: entry });
};
