import { Analysis, SentimentEntry } from '@prisma/client';

type EntryCardProps = {
  entry: SentimentEntry & { analysis?: Analysis };
};

export default function EntryCard({ entry }: EntryCardProps) {
  return (
    <div className="rounded-lg border border-white/10 px-3 py-2">
      <p className="text-lg">{entry.content}</p>
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
