'use client';

import { createNewEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function NewEntry() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleOnCick = async () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      const data = await createNewEntry();
      router.push(`/sentiments/${data.id}`);
    });
  };

  return (
    <div className="cursor-pointer">
      <button
        disabled={isPending}
        type="button"
        className="text-3xl text-white disabled:text-white/10"
        onClick={handleOnCick}
      >
        New entry
      </button>
    </div>
  );
}
