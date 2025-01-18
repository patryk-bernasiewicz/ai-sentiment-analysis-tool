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

  const entry = await prisma.sentimentEntry.findUniqueOrThrow({
    where: {
      id: entryId,
      AND: {
        userId: user.id,
      },
    },
  });

  return entry;
};

export type SingleEntryPageParams = Promise<{
  id: string;
}>;

export default async function SingleEntryPage({
  params,
}: {
  params: SingleEntryPageParams;
}) {
  const id = (await params).id;
  const entry = await getSingleEntry(id);

  if (!entry) {
    return notFound();
  }

  return (
    <>
      <h1 className="mb-6 text-xl font-bold">Single analysis entry</h1>
      <Editor entry={entry} />
      <Link
        href="/sentiments"
        className="inline-flex max-w-[180px] bg-slate-700 px-3 py-2 font-semibold text-white"
      >
        Back to list
      </Link>
    </>
  );
}
