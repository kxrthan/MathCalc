'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h2 className="text-2xl font-bold text-destructive mb-4">Something went wrong!</h2>
      <div className="bg-muted p-4 rounded-md text-left mb-6 max-w-2xl overflow-auto w-full">
        <p className="font-mono text-sm text-muted-foreground">{error.message}</p>
        {error.stack && (
          <pre className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap">{error.stack}</pre>
        )}
      </div>
      <button
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
