import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { NavDots } from "../components/NavDots";

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-dvh">
      <Header />

      {isHome && <NavDots />}

      <Outlet />
    </div>
  );
}
