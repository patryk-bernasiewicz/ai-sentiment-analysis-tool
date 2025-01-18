import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const user = await getUserByClerkId();
  const content = 'I really loved the Pepsi Max 2,5L.';

  const entry = await prisma.sentimentEntry.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      content,
    },
  });

  revalidatePath('/sentiments');

  const analysis = await analyze(content);
  if (analysis) {
    await prisma.analysis.create({
      data: {
        sentiment: analysis.sentiment,
        summary: analysis.summary,
        entryId: entry.id,
      },
    });
  }

  return NextResponse.json({ data: entry });
};
