import { Analysis, SentimentEntry } from '@prisma/client';
import Link from 'next/link';

type EntryCardProps = {
  entry: SentimentEntry & { analysis?: Analysis };
};

export default function EntryCard({ entry }: EntryCardProps) {
  return (
    <div className="rounded-lg border border-white/10 px-3 py-2">
      <Link href={`/sentiments/${entry.id}`} className="text-lg">
        {entry.content}
      </Link>
      <div className="mt-2 text-sm text-white/80">
        {entry.analysis ? (
          <div>AI analysis: haha</div>
        ) : (
          <div>No AI analysis yet</div>
        )}
      </div>
    </div>
  );
}
