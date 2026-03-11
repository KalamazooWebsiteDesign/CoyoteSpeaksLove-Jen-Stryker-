import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import CurrentReleases from "../pages/current-releases/page";
import MyNeighborsAreVampires from "../pages/books/my-neighbors-are-vampires/page";
import KeanuTails from "../pages/books/keanu-tails/page";
import Merchandise from "../pages/merchandise/page";
import WritersHubPage from "../pages/writers-hub/page";
import BlogPostPage from "../pages/blog-post/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/current-releases",
    element: <CurrentReleases />,
  },
  {
    path: "/books/my-neighbors-are-vampires",
    element: <MyNeighborsAreVampires />,
  },
  {
    path: "/books/keanu-tails",
    element: <KeanuTails />,
  },
  {
    path: "/merchandise",
    element: <Merchandise />,
  },
  {
    path: "/writers-hub",
    element: <WritersHubPage />,
  },
  {
    path: "/blog",
    element: <WritersHubPage />,
  },
  {
    path: "/blog/:slug",
    element: <BlogPostPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;