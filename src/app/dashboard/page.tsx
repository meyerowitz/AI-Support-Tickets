import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricCards from "@/components/dashboard/MetricCards";
import TicketTable from "@/components/dashboard/TicketTable";
import AIResponsePanel from "@/components/dashboard/AIResponsePanel";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        title="Dashboard"
        subtitle="Overview of your support ticket system"
      />
      <MetricCards />
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Recent Tickets
        </h2>
        <TicketTable />
      </div>
      <div className="mt-8">
        <AIResponsePanel />
      </div>
    </>
  );
}
