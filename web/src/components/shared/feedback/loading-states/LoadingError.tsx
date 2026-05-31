export const LoadingError = ({ description }: { description: string }) => {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="text-center">
        <h2 className="text-destructive text-lg font-semibold">
          Помилка завантаження
        </h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
