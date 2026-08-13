import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router-dom';
import { Loader } from '@/shared/components';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from './AppLayout';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const PostDetails = lazy(() => import('@/pages/PostDetails'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: withSuspense(Login),
  },
  {
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/', element: withSuspense(Home) },
          { path: '/posts/:id', element: withSuspense(PostDetails) },
          {
            element: <ProtectedRoute allowedRoles={['admin', 'collaborator']} />,
            children: [{ path: '/dashboard', element: withSuspense(Dashboard) }],
          },
        ],
      },
    ],
  },
  { path: '*', element: withSuspense(NotFound) },
]);

export function AppRouter() {
  return <ReactRouterProvider router={router} />;
}
