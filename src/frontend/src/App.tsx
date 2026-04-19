import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";

const CapturePage = lazy(() =>
  import("./pages/CapturePage").then((m) => ({ default: m.CapturePage })),
);
const ResultsPage = lazy(() =>
  import("./pages/ResultsPage").then((m) => ({ default: m.ResultsPage })),
);
const HistoryPage = lazy(() =>
  import("./pages/HistoryPage").then((m) => ({ default: m.HistoryPage })),
);
const CollectionsPage = lazy(() =>
  import("./pages/CollectionsPage").then((m) => ({
    default: m.CollectionsPage,
  })),
);
const CollectionDetailPage = lazy(() =>
  import("./pages/CollectionDetailPage").then((m) => ({
    default: m.CollectionDetailPage,
  })),
);
const ComparePage = lazy(() =>
  import("./pages/ComparePage").then((m) => ({ default: m.ComparePage })),
);
const SharedScanPage = lazy(() =>
  import("./pages/SharedScanPage").then((m) => ({ default: m.SharedScanPage })),
);
const SettingsPage = lazy(() =>
  import("./pages/SettingsPage").then((m) => ({ default: m.SettingsPage })),
);
const DiscoveryPage = lazy(() =>
  import("./pages/DiscoveryPage").then((m) => ({ default: m.DiscoveryPage })),
);
const VideoAnalysisPage = lazy(() =>
  import("./pages/VideoAnalysisPage").then((m) => ({
    default: m.VideoAnalysisPage,
  })),
);

function PageLoader() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 space-y-4">
      <Skeleton className="h-64 w-full rounded-lg" />
      <Skeleton className="h-10 w-1/3 rounded" />
      <Skeleton className="h-6 w-2/3 rounded" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CapturePage,
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/results",
  component: ResultsPage,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: HistoryPage,
});

const collectionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collections",
  component: CollectionsPage,
});

const collectionDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collections/$collectionId",
  component: CollectionDetailPage,
});

const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare",
  component: ComparePage,
});

const sharedScanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shared/$token",
  component: SharedScanPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});

const discoveryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discovery",
  component: DiscoveryPage,
});

const videoAnalysisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/video-analysis",
  component: VideoAnalysisPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  resultsRoute,
  historyRoute,
  collectionsRoute,
  collectionDetailRoute,
  compareRoute,
  sharedScanRoute,
  settingsRoute,
  discoveryRoute,
  videoAnalysisRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
