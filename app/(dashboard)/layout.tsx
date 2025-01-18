import { UserButton } from '@clerk/nextjs';
import type { ReactNode } from 'react';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-screen bg-black text-white">
      <aside className="min-w-[150px] border-r border-white/10 p-4">Mood</aside>
      <div className="flex w-full flex-col">
        <header className="flex h-[60px] items-center border-b border-white/10 px-4">
          <div className="flex w-full justify-end">
            <UserButton />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
