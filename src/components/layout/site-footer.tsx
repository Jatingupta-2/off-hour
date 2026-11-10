export function SiteFooter() {
  return (
    <footer className="flex flex-wrap justify-between gap-4 px-6 py-6 text-xs text-muted md:px-14">
      <span>Wear your own time.</span>
      <span>© {new Date().getFullYear()} OFFHOUR</span>
    </footer>
  );
}
