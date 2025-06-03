export function Status({
  message,
  isError = false,
}: {
  message: string;
  isError?: boolean;
}) {
  return (
    <div className={`text-center text-lg ${isError ? "text-red-500" : ""}`}>
      {message}
    </div>
  );
}
