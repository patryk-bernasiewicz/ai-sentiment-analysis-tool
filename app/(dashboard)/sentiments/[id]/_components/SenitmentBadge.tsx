import { cn } from 'clsx-for-tailwind';

type SentimentBadgeProps = {
  sentiment: 'positive' | 'negative' | 'neutral' | undefined | null;
};

export default function SentimentBadge({ sentiment }: SentimentBadgeProps) {
  const renderValue = () => {
    if (sentiment === 'positive') {
      return 'Positive 😊';
    } else if (sentiment === 'negative') {
      return 'Negative 😞';
    } else if (sentiment === 'neutral') {
      return 'Neutral 😐';
    } else {
      return 'Unknown 🤔';
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center px-1 py-0.5 text-sm',
        sentiment === 'positive' && 'bg-green-200 text-green-900',
        sentiment === 'negative' && 'bg-red-200 text-red-900',
        sentiment === 'neutral' && 'bg-gray-200 text-gray-900',
        !sentiment && 'bg-gray-200 text-gray-900',
      )}
    >
      {renderValue()}
    </div>
  );
}
