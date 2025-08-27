export const Loader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-t-gray-500 border-gray-300" />
      </div>
    </div>
  );
};
