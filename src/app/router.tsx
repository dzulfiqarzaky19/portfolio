import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { Home } from "../pages/Home/Home";
import About from "../pages/About/About";
import FitTrack from "../pages/FitTrack";
import Shopstream from "../pages/Shopstream";
import WebNovel from "../pages/WebNovel";
import LastProject from "../pages/LastProject";
import { NotFound } from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "fit-track", element: <FitTrack /> },
      { path: "shopstream", element: <Shopstream /> },
      { path: "web-novel", element: <WebNovel /> },
      { path: "last-project", element: <LastProject /> },
    ],
  },
]);
