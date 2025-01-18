import { auth } from '@clerk/nextjs/server';
import { cn } from 'clsx-for-tailwind';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();

  const getStartedHref = userId ? '/sentiments' : '/sign-in';

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
      <div className="mx-auto flex w-full max-w-[600px] flex-col gap-4">
        <h1 className="text-6xl">AI Sentiment Analysis Tool</h1>
        <p className="text-2xl text-white/60">
          This tool uses AI to analyze the sentiment for the messages you
          provide.
        </p>
        <div>
          <Link href={getStartedHref}>
            <button
              className={cn(
                'inline-flex items-center justify-center rounded-sm bg-yellow-600 px-3 py-1 font-medium text-black',
                'hover:bg-yellow-500 focus:bg-yellow-500',
              )}
              type="button"
            >
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
