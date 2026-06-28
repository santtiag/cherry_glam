export function TableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Cargando">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-14 animate-pulse rounded-xl bg-cherry-100/50"
        />
      ))}
    </div>
  );
}
