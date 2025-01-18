import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { redirect } from 'next/navigation';
import NewEntry from './_components/NewEntry';
import EntryCard from './_components/EntryCard';
import { Analysis, SentimentEntry } from '@prisma/client';

const getEntries = async () => {
  const user = await getUserByClerkId();

  if (!user) {
    return redirect('/new-user');
  }

  const entries = await prisma.sentimentEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  });

  return entries as (SentimentEntry & { analysis?: Analysis })[];
};

export default async function Sentiments() {
  const entries = await getEntries();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Your current entries</h1>
      <NewEntry />
      <ul className="flex flex-col gap-4">
        {entries.map((entry) => (
          <li key={entry.id}>
            <EntryCard entry={entry} />
          </li>
        ))}
      </ul>
    </div>
  );
}
