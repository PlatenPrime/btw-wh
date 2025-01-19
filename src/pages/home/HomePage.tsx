import { Outlet } from "react-router";

export const HomePage = () => {
  return (
    <div>
      <h1 className="text-center text-3xl">Home Page</h1>
      <Outlet />
    </div>
  );
};
