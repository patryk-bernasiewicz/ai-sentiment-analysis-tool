'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { SentimentEntry } from '@prisma/client';
import { updateEntry } from '@/utils/api';
import { cn } from 'clsx-for-tailwind';
import { useRouter } from 'next/navigation';

type EditorProps = {
  entry: SentimentEntry;
};

const AUTOSAVE_DELAY = 1500;
const SAVE_DELAY = 0;

export default function Editor({ entry }: EditorProps) {
  const router = useRouter();
  const [content, setContent] = useState(entry?.content || '');
  const [isPending, startTransition] = useTransition();
  const autosaveRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isMounted = useRef(false);

  const handleSave = useCallback(() => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, SAVE_DELAY));
      await updateEntry(entry.id, content);
      router.refresh();
    });
  }, [content, entry.id, router]);

  // handle autosave
  useEffect(() => {
    if (!isMounted.current || content === entry.content) {
      isMounted.current = true;
      return;
    }

    clearTimeout(autosaveRef.current);
    autosaveRef.current = setTimeout(handleSave, AUTOSAVE_DELAY);

    return () => {
      clearTimeout(autosaveRef.current);
    };
  }, [content, entry.content, entry.id, handleSave]);

  // handle Ctrl+S combination to save
  useEffect(() => {
    if (typeof window === 'undefined' || content === entry.content) {
      return;
    }

    const handleSaveCombination = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleSaveCombination);

    return () => {
      window.removeEventListener('keydown', handleSaveCombination);
    };
  }, [content, entry.content, handleSave]);

  return (
    <form action={handleSave}>
      <h1 className="text-xl">Editor</h1>
      <div className={cn('invisible', isPending && 'visible animate-pulse')}>
        Saving...
      </div>
      <textarea
        className="h-32 w-full max-w-[400px] border border-gray-600 bg-slate-900 p-2 focus:border-gray-500 focus:outline-none"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
    </form>
  );
}
