export const LoadingNoData = ({description}: {description: string}) => {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="text-center">
        <h2 className="text-foreground text-lg font-semibold">Немає даних</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};