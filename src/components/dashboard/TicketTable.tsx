"use client";

import Badge from "@/components/shared/Badge";

interface Ticket {
  id: number;
  title: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  assignee: string;
  created: string;
}

const tickets: Ticket[] = [
  { id: 1001, title: "Database connection timeout", priority: "Critical", status: "Open", assignee: "Alice Chen", created: "2 min ago" },
  { id: 1002, title: "Payment gateway integration error", priority: "Critical", status: "In Progress", assignee: "Bob Kim", created: "15 min ago" },
  { id: 1003, title: "User profile image not loading", priority: "High", status: "Open", assignee: "Carlos Ruiz", created: "1 hr ago" },
  { id: 1004, title: "Email notification delay", priority: "Medium", status: "In Progress", assignee: "Diana Park", created: "3 hr ago" },
  { id: 1005, title: "API rate limiting configuration", priority: "Low", status: "Resolved", assignee: "Eve Torres", created: "6 hr ago" },
  { id: 1006, title: "Search results pagination bug", priority: "Medium", status: "Resolved", assignee: "Frank Li", created: "1 day ago" },
  { id: 1007, title: "SSL certificate renewal", priority: "High", status: "In Progress", assignee: "Grace Kim", created: "2 days ago" },
];

const priorityMap: Record<string, "critical" | "high" | "medium" | "low"> = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Low: "low",
};

const statusMap: Record<string, "open" | "in-progress" | "resolved"> = {
  Open: "open",
  "In Progress": "in-progress",
  Resolved: "resolved",
};

export default function TicketTable() {
  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <div className="mb-4 text-4xl">🎉</div>
        <h3 className="text-lg font-semibold text-gray-700">No tickets yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          New tickets will appear here once they are created.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-card-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-5 py-3.5 font-semibold text-gray-600">ID</th>
              <th className="px-5 py-3.5 font-semibold text-gray-600">Title</th>
              <th className="px-5 py-3.5 font-semibold text-gray-600">
                Priority
              </th>
              <th className="px-5 py-3.5 font-semibold text-gray-600">
                Status
              </th>
              <th className="px-5 py-3.5 font-semibold text-gray-600">
                Assignee
              </th>
              <th className="px-5 py-3.5 font-semibold text-gray-600">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50/50"
              >
                <td className="px-5 py-4 font-mono text-xs text-gray-400">
                  #{ticket.id}
                </td>
                <td className="px-5 py-4 font-medium text-gray-900">
                  {ticket.title}
                </td>
                <td className="px-5 py-4">
                  <Badge variant={priorityMap[ticket.priority]}>
                    {ticket.priority}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <Badge variant={statusMap[ticket.status]}>
                    {ticket.status}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-gray-600">{ticket.assignee}</td>
                <td className="px-5 py-4 text-gray-400">{ticket.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
