import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [form, setForm]     = useState({ nom: '', email: '', password: '', confirm: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('Les mots de passe ne correspondent pas');
    if (form.password.length < 6) return setError('Mot de passe trop court (min. 6 caractères)');
    setLoading(true); setError('');
    try {
      await signup(form.nom, form.email, form.password);
      navigate('/city-guide');
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const field = (key, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input type={type} required value={form[key]}
        onChange={e => { setForm({ ...form, [key]: e.target.value }); setError(''); }}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
        placeholder={placeholder} />
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary font-display italic mb-2">Inscription</h1>
          <p className="text-gray-500">Rejoignez la communauté FOODING</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-5 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {field('nom',     'Nom complet',          'text',     'Votre nom')}
            {field('email',   'Email',                'email',    'votre@email.com')}
            {field('password','Mot de passe',         'password', '••••••••')}
            {field('confirm', 'Confirmer mot de passe','password', '••••••••')}
            <button type="submit" disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-dark transition disabled:opacity-60">
              {loading ? 'Création...' : "Créer mon compte"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
