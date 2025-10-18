import { Link, NavLink, useLocation } from "react-router-dom";

export const Header = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-10 p-6">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 md:px-8">
        <Link
          to="/"
          className="text-white text-3xl font-black tracking-[-0.015em] font-display"
        >
          ZA
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-text-secondary-dark">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-white" : "hover:text-white"
            }
          >
            {isHome ? "Home" : pathname.split("/")[1]}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
