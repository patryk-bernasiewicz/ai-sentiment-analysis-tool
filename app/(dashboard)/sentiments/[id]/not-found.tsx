import Link from 'next/link';

export default async function SingleEntryNotFoundPage() {
  return (
    <div>
      <h1>Ooops</h1>
      <div>This entry doesn&apos;t exist.</div>
      <Link href="/sentiments">Back to entries list</Link>
    </div>
  );
}
