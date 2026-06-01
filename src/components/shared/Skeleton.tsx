interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gray-200 ${className}`}
    />
  );
}

export function TicketTableSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-28 flex-1" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
      ))}
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="flex gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-1 flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm"
        >
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
}

export function AiPanelSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-24 w-full" />
      <div className="flex justify-end">
        <Skeleton className="h-10 w-36" />
      </div>
    </div>
  );
}
