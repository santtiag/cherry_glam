interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="group rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-cherry-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:border-gold/40">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cherry/10 ring-1 ring-gold/20 transition-colors group-hover:bg-cherry/15">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}
