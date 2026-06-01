"use client";

import ErrorMessage from "@/components/shared/ErrorMessage";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <ErrorMessage
        title="Dashboard Error"
        message={error.message || "An unexpected error occurred loading the dashboard."}
        onRetry={reset}
      />
    </div>
  );
}
