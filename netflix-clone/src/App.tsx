import React, { lazy } from "react";
import {
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router";
import { createBrowserRouter, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./common/auth";
import ProfilesProvider from "./common/profiles-context";
const Layout = lazy(() => import("./components/layout"));
import Loader from "./components/loader";
// import Browse from "./pages/browse";
const Browse = lazy(() => import("./pages/browse"));
const Login = lazy(() => import("./pages/login"));
const Profile = lazy(() => import("./pages/profile"));
const Registration = lazy(() => import("./pages/registration"));

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth();
  if (!user && !loading) {
    return <Navigate to="/login" />;
  }
  return children;
}

function RouteError() {
  return (
    <article className="grid place-content-center gap-2 p-4">
      <h1 className="text-4xl">The page you're looking for doesn't exist</h1>
      <p className="text-2xl">
        Browse more content{" "}
        <Link className="text-netflixRed" to="/browse">
          here
        </Link>
      </p>
    </article>
  );
}

function AppRouter() {
  const { loading } = useAuth();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
          errorElement={<RouteError />}
        >
          <Route index element={<Profile />}></Route>
          <Route path="ManageProfiles" element={<Profile edit />}></Route>
          <Route path="browse" element={<Layout />}>
            <Route index element={<Browse />} />
          </Route>
          <Route path="latest" element={<Layout />}>
            <Route index element={<h1>Latest</h1>} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </>
    )
  );
  return loading ? (
    <Loader />
  ) : (
    <React.Suspense fallback={<Loader />}>
      <RouterProvider router={router}></RouterProvider>
    </React.Suspense>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProfilesProvider>
        <AppRouter />
      </ProfilesProvider>
    </AuthProvider>
  );
}
