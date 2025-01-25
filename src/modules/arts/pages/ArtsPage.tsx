import { Link, Outlet } from "react-router";

export const ArtsPage = () => {
  return (
    <div>
      ArtsPage
      <div>Arts</div>
      <Link to="/arts/upload">Upload</Link>
      <Outlet />
    </div>
  );
};
