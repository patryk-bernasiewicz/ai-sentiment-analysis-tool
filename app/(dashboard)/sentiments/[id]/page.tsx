import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { notFound } from 'next/navigation';
import Editor from './_components/Editor';
import Link from 'next/link';

const getSingleEntry = async (entryId: string) => {
  const user = await getUserByClerkId();

  if (!user) {
    throw new Error('User not found');
  }

  const entry = prisma.sentimentEntry.findUnique({
    where: {
      id: entryId,
      AND: {
        userId: user.id,
      },
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};

export default async function SingleEntryPage({
  params,
}: {
  params: { id: string };
}) {
  const entry = await getSingleEntry(params.id);

  if (!entry) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">Single analysis entry</h1>
      <Editor entry={entry} />
      {entry?.analysis ? (
        <div>AI analysis: haha</div>
      ) : (
        <div>No AI analysis yet</div>
      )}
      <Link href="/sentiments">Back to list</Link>
    </div>
  );
}
