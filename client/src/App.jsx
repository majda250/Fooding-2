import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/layout/Header';
import Home             from './pages/Home';
import Contact from './pages/Contact'; 
import CityGuide        from './pages/CityGuide';
import RestaurantDetail from './pages/RestaurantDetail';
import Login            from './pages/Login';
import Signup           from './pages/Signup';
import Profil           from './pages/Profil';

// Route protégée — redirige vers /login si non connecté
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/"                          element={<Home />} />
          <Route path="/city-guide"                element={<CityGuide />} />
          <Route path="/restaurant/:ville/:id"     element={<RestaurantDetail />} />
          <Route path="/login"                     element={<Login />} />
          <Route path="/signup"                    element={<Signup />} />
	  <Route path="/contact" element={<Contact />} /> 
          <Route path="/profil"                    element={<PrivateRoute><Profil /></PrivateRoute>} />
          <Route path="*"                          element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
