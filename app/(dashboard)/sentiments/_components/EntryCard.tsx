import { Analysis, SentimentEntry } from '@prisma/client';
import Link from 'next/link';
import SentimentBadge from '../[id]/_components/SenitmentBadge';

type EntryCardProps = {
  entry: SentimentEntry & { analysis?: Analysis };
};

export default function EntryCard({ entry }: EntryCardProps) {
  return (
    <div className="rounded-lg border border-white/10 px-3 py-2">
      <Link
        href={`/sentiments/${entry.id}`}
        className="whitespace-pre-line text-lg leading-loose"
      >
        {entry.content}
      </Link>
      <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
        <span>Sentiment:</span>
        <SentimentBadge sentiment={entry.analysis?.sentiment} />
      </div>
    </div>
  );
}
