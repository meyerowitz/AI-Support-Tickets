interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl">
        ⚠
      </div>
      <h3 className="text-lg font-semibold text-red-800">{title}</h3>
      <p className="mt-1 text-sm text-red-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 cursor-pointer"
        >
          Try again
        </button>
      )}
    </div>
  );
}
