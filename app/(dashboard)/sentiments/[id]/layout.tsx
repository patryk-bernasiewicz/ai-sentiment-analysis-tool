import { ReactNode } from 'react';

export default async function SingleEntryLayout({
  children,
  aianalysis,
}: {
  children: ReactNode;
  aianalysis: ReactNode;
}) {
  return (
    <main className="flex grow flex-col md:flex-row">
      <div className="flex grow flex-col p-4">{children}</div>
      <div className="flex min-w-[280px] max-w-[440px] flex-col border-t border-white/10 p-4 md:border-l md:border-t-0">
        <h2 className="mb-6 text-xl font-bold">AI analysis</h2>
        {aianalysis}
      </div>
    </main>
  );
}
