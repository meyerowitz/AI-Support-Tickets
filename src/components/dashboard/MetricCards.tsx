const metrics = [
  {
    label: "Total Tickets",
    value: "1,320",
    change: "+12% from last week",
    color: "text-primary",
    bg: "bg-primary/5",
  },
  {
    label: "Avg Response",
    value: "1.2 HR",
    change: "-0.3 HR improvement",
    color: "text-accent",
    bg: "bg-accent/5",
  },
  {
    label: "Critical Risk",
    value: "94%",
    change: "3 tickets at risk",
    color: "text-critical",
    bg: "bg-critical-bg",
  },
];

export default function MetricCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-2xl border border-card-border bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <p className="text-sm font-medium text-gray-500">{metric.label}</p>
          <p className={`mt-2 text-3xl font-bold ${metric.color}`}>
            {metric.value}
          </p>
          <p className="mt-1 text-xs text-gray-400">{metric.change}</p>
        </div>
      ))}
    </div>
  );
}
