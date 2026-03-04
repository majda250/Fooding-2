import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-secondary sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary font-display italic tracking-wide">
          FOODING
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-primary transition font-medium text-sm">
            Accueil
          </Link>
          <Link to="/city-guide" className="text-gray-600 hover:text-primary transition font-medium text-sm">
            Explorer
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/profil" className="text-gray-600 hover:text-primary transition font-medium text-sm">
                {user?.nom}
              </Link>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-dark transition"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-primary font-semibold text-sm hover:underline">
                Connexion
              </Link>
              <Link to="/signup" className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-dark transition">
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
