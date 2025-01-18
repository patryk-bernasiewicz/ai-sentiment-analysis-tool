'use client';

const createUrl = (path: string) => {
  return window.location.origin + path;
};

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createUrl('/api/entry'), {
      method: 'POST',
      body: JSON.stringify({
        content: 'Write some comment here',
      }),
    }),
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
