import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HeaderLayout } from '../layouts'
import { AuthProvider } from './providers';
import {PrivateRoute} from './router'
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

const Heroes = lazy(() => import('../features/Heroes/Heroes'));
const Locations = lazy(() => import('../features/Locations/Locations'));
const Episodes = lazy(() => import('../features/Episodes/Episodes'));
const Home = lazy(() => import('../pages/Home/Home'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const InfoComponent = lazy(() => import('../shared/ui/InfoComponent/InfoComponent'));
const Signin = lazy(() => import('../pages/Signin/Signin'));

const ProtectedRoute = ({children}) => {
  return (
    <ErrorBoundary>
      <PrivateRoute>
        <Suspense>
          {children}
        </Suspense>
      </PrivateRoute>
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<HeaderLayout />}>
            <Route index element={<Home />} />
            <Route path="heroes">
              <Route index element={<ProtectedRoute><Heroes /></ProtectedRoute>}/>
              <Route path=':id' element={<ProtectedRoute><InfoComponent category='heroes' /></ProtectedRoute>} />
            </Route>
            <Route path="episodes">
              <Route index element={<ProtectedRoute><Episodes /></ProtectedRoute>}/>
              <Route path=':id' element={<ProtectedRoute><InfoComponent category='episodes' /></ProtectedRoute>} />
            </Route>
            <Route path="locations">
              <Route index element={<ProtectedRoute><Locations /></ProtectedRoute>} />
              <Route path=':id' element={<ProtectedRoute><InfoComponent category='locations' /></ProtectedRoute>} />
            </Route>
            <Route path="login">
              <Route index element={<ErrorBoundary><Signin /></ErrorBoundary>} />
            </Route>
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}