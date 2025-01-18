import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type UpdateEntryBody = {
  content: string;
};

type RouteParams = Promise<{
  id: string;
}>;

export const PUT = async (
  request: NextRequest,
  { params }: { params: RouteParams },
) => {
  const { id } = await params;
  const { content } = (await request.json()) as UpdateEntryBody;

  const user = await getUserByClerkId();

  const entry = await prisma.sentimentEntry.update({
    where: {
      id,
      AND: {
        userId: user?.id,
      },
    },
    include: {
      analysis: true,
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(content);

  if (analysis) {
    entry.analysis = await prisma.analysis.upsert({
      where: {
        entryId: entry.id,
      },
      create: {
        entryId: entry.id,
        ...analysis,
      },
      update: analysis,
    });
  }

  revalidatePath('/sentiments');
  revalidatePath(`/sentiments/${entry.id}`);
  revalidatePath(`/sentiments/${entry.id}/@aianalysis`);

  return NextResponse.json({ data: entry });
};
