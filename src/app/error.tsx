"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="m-auto max-w-lg px-6 py-24">
      <h1 className="mb-4 text-3xl">Something went wrong.</h1>
      <p className="mb-6 text-muted">Please try again.</p>
      <button
        type="button"
        onClick={reset}
        className="min-h-11 border border-border px-6 py-3"
      >
        Try again
      </button>
    </section>
  );
}
