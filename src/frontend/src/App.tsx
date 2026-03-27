import { Toaster } from "@/components/ui/sonner";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { PasswordGate } from "./components/PasswordGate";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { NewSession } from "./pages/NewSession";
import { Patients } from "./pages/Patients";
import { Profile } from "./pages/Profile";
import { QuantumDiagnostics } from "./pages/QuantumDiagnostics";
import { ReferenceLibrary } from "./pages/ReferenceLibrary";

function Layout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/dashboard" />,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});

const patientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patients",
  component: Patients,
});

const newSessionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/new-session",
  component: NewSession,
});

const quantumRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quantum",
  component: QuantumDiagnostics,
});

const referenceLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reference-library",
  component: ReferenceLibrary,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  patientsRoute,
  newSessionRoute,
  quantumRoute,
  referenceLibraryRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <PasswordGate>
        <RouterProvider router={router} />
      </PasswordGate>
      <Toaster richColors position="top-right" />
    </ErrorBoundary>
  );
}
