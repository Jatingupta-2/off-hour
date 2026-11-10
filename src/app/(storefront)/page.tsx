import { ButtonLink } from "@/components/ui/button-link";

export default function HomePage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">
        OFFHOUR / The beginning
      </p>
      <h1 className="max-w-3xl text-5xl leading-[1.08] tracking-[-0.055em] md:text-7xl">
        Wear your own time.
      </h1>
      <div
        aria-hidden="true"
        className="my-14 h-px w-full max-w-5xl bg-border"
      />
      <p className="mb-8 max-w-sm text-sm leading-6 text-muted">
        A quiet foundation for what comes next. The interactive wardrobe will
        live here.
      </p>
      <ButtonLink href="/shop">Explore the shop</ButtonLink>
    </section>
  );
}
