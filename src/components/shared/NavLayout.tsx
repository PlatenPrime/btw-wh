import { NavLink, Outlet } from "react-router";

export const NavLayout = () => {
  return (
    <div>
  

      <nav className="flex justify-between  mx-auto">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/arts">Arts</NavLink>
        <NavLink to="/asks">Asks</NavLink>
        <NavLink to="/defs">Defs</NavLink>
        <NavLink to="/poses">Poses</NavLink>
        <NavLink to="/racks">Racks</NavLink>
        <NavLink to="/login" end>
          Login
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};
