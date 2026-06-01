import { MetricCardSkeleton, TicketTableSkeleton, AiPanelSkeleton } from "@/components/shared/Skeleton";

export default function DashboardLoading() {
  return (
    <div>
      <div className="mb-8">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded-lg bg-gray-200" />
      </div>
      <MetricCardSkeleton />
      <div className="mt-8">
        <div className="mb-4 h-5 w-32 animate-pulse rounded-lg bg-gray-200" />
        <TicketTableSkeleton />
      </div>
      <div className="mt-8">
        <AiPanelSkeleton />
      </div>
    </div>
  );
}
