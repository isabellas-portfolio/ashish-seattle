export default function TopNav() {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 py-4">
      <a
        href="#seattle"
        className="rounded-full border border-coastal-soft bg-white px-4 py-2 text-sm font-medium text-coastal-navy shadow-soft transition-colors hover:bg-coastal-soft"
      >
        Seattle Recs
      </a>
      <a
        href="#dates"
        className="rounded-full border border-coastal-soft bg-white px-4 py-2 text-sm font-medium text-coastal-navy shadow-soft transition-colors hover:bg-coastal-soft"
      >
        Date Ideas
      </a>
      <a
        href="#letters"
        className="rounded-full border border-coastal-soft bg-white px-4 py-2 text-sm font-medium text-coastal-navy shadow-soft transition-colors hover:bg-coastal-soft"
      >
        Open When Letters
      </a>
    </nav>
  );
}
