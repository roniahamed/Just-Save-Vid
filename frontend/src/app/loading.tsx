export default function Loading() {
  return (
    <main className="mx-auto flex max-w-6xl flex-1 items-center px-4 py-24 md:px-6">
      <div className="w-full rounded-[2.2rem] border border-black/5 bg-white/90 p-10">
        <div className="h-4 w-28 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-6 h-14 max-w-3xl animate-pulse rounded-3xl bg-slate-200" />
        <div className="mt-4 h-6 max-w-2xl animate-pulse rounded-full bg-slate-100" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="h-32 animate-pulse rounded-[1.6rem] bg-slate-100" />
          <div className="h-32 animate-pulse rounded-[1.6rem] bg-slate-100" />
          <div className="h-32 animate-pulse rounded-[1.6rem] bg-slate-100" />
        </div>
      </div>
    </main>
  );
}
