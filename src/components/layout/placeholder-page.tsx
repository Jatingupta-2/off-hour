import { ButtonLink } from "@/components/ui/button-link";

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">
        Project foundation
      </p>
      <h1 className="text-4xl tracking-tight md:text-5xl">{title}</h1>
      <p className="max-w-lg leading-7 text-muted">{description}</p>
      <p className="text-sm text-muted">
        This page is a scaffold. No account, stock, or payment action is
        performed.
      </p>
      <ButtonLink href="/">Back to OFFHOUR</ButtonLink>
    </section>
  );
}
