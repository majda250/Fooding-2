import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-secondary/30 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary to-accent p-10 text-center">
            <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              👤
            </div>
            <h1 className="text-2xl font-bold text-white">{user?.nom}</h1>
            <p className="text-white/80 text-sm mt-1">{user?.email}</p>
          </div>

          {/* Infos */}
          <div className="p-8 space-y-5">
            <div className="bg-secondary/30 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Nom</span>
                <span className="font-semibold text-gray-800">{user?.nom}</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                <span className="text-gray-500 text-sm">Email</span>
                <span className="font-semibold text-gray-800">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                <span className="text-gray-500 text-sm">Favoris</span>
                <span className="font-semibold text-gray-800">{user?.favoris?.length || 0} restaurant(s)</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full border-2 border-red-200 text-red-500 py-3 rounded-xl font-semibold hover:bg-red-50 transition"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
