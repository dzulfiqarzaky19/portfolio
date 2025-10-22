import { NavLink, useLocation } from "react-router-dom";

interface HeaderProps {
  onNavigate: (path: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-10 p-6 ">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 md:px-8">
        <NavLink
          to="/"
          className="text-white text-3xl font-black tracking-[-0.015em] font-display"
          onClick={(e) => {
            e.preventDefault();

            onNavigate("/");
          }}
        >
          ZA
        </NavLink>

        <nav className="hidden md:flex items-center gap-8 text-text-secondary-dark">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-white" : "hover:text-white"
            }
            onClick={(e) => {
              e.preventDefault();

              onNavigate("/");
            }}
          >
            {isHome ? "Home" : pathname.split("/")[1]}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
