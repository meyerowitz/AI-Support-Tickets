interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
}

export default function EmptyState({
  icon = "📭",
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
