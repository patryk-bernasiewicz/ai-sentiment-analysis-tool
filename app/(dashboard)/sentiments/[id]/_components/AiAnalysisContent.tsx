'use client';

import { Analysis } from '@prisma/client';
import SentimentBadge from './SenitmentBadge';

type AiAnalysisContentProps = {
  analysis: Analysis;
};

export default function AiAnalysisContent({
  analysis,
}: AiAnalysisContentProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <SentimentBadge sentiment={analysis?.sentiment} />
      {analysis?.summary && (
        <p className="text-center text-sm">{analysis.summary}</p>
      )}
    </div>
  );
}
