import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.nom || !formData.email || !formData.message) {
      setError('Veuillez remplir tous les champs obligatoires');
      setLoading(false);
      return;
    }

    try {
      // TODO: Envoyer au backend
      // const response = await axios.post('/api/contact', formData);
      
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setFormData({
        nom: '',
        email: '',
        sujet: '',
        message: ''
      });

      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-white to-beige-dark">
      {/* Texture grain overlay */}
      <div className="fixed inset-0 bg-grain opacity-[0.03] pointer-events-none z-50"></div>

      <div className="relative py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to="/" className="text-primary hover:text-accent transition-colors inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à l'accueil
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary"></div>
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 
00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-dark to-primary bg-clip-text text-transparent">
                Contactez-nous
              </span>
            </h1>
            <p className="text-lg md:text-xl text-dark/70 max-w-2xl mx-auto font-light">
              Une question, une suggestion ou simplement envie d'échanger ? 
              <span className="block mt-2 text-primary font-semibold">
                Notre équipe vous répond sous 24h.
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Informations de contact */}
            <div className="lg:col-span-1 space-y-6">
              {/* Card Email */}
              <div className="bg-white/70 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center 
group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 
2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-dark mb-2">Email</h3>
                    <a href="mailto:contact@foodiug.com" className="text-primary hover:text-accent transition-colors text-sm">
                      contact@foodiug.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Card Téléphone */}
              <div className="bg-white/70 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center 
group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 
01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 
6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-dark mb-2">Téléphone</h3>
                    <a href="tel:+212600000000" className="text-primary hover:text-accent transition-colors text-sm">
                      +212 6 00 00 00 00
                    </a>
                  </div>
                </div>
              </div>

              {/* Card Adresse */}
              <div className="bg-white/70 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary/20 to-brown-light/20 rounded-2xl flex items-center 
justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 
0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-dark mb-2">Adresse</h3>
                    <p className="text-dark/70 text-sm">
                      Rabat, Maroc<br />
                      Quartier Hassan
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Horaires */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-xl border border-primary/20 rounded-3xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-dark mb-2">Horaires</h3>
                    <p className="text-dark/70 text-sm">
                      Lundi - Vendredi<br />
                      <span className="text-primary font-semibold">9h00 - 18h00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                {success && (
                  <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-2xl p-4 flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-green-800 mb-1">Message envoyé avec succès !</h4>
                      <p className="text-green-700 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-6 bg-red-50 border-2 border-red-500 rounded-2xl p-4 flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom */}
                  <div>
                    <label className="block text-dark font-bold mb-2 text-sm uppercase tracking-wide">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white border-2 border-primary/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary 
focus:border-transparent transition-all duration-300 text-dark"
                      placeholder="Votre nom"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-dark font-bold mb-2 text-sm uppercase tracking-wide">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white border-2 border-primary/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary 
focus:border-transparent transition-all duration-300 text-dark"
                      placeholder="votre@email.com"
                    />
                  </div>

                  {/* Sujet */}
                  <div>
                    <label className="block text-dark font-bold mb-2 text-sm uppercase tracking-wide">
                      Sujet
                    </label>
                    <input
                      type="text"
                      name="sujet"
                      value={formData.sujet}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white border-2 border-primary/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary 
focus:border-transparent transition-all duration-300 text-dark"
                      placeholder="Objet de votre message"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-dark font-bold mb-2 text-sm uppercase tracking-wide">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-5 py-4 bg-white border-2 border-primary/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary 
focus:border-transparent transition-all duration-300 text-dark resize-none"
                      placeholder="Écrivez votre message ici..."
                    />
                  </div>

                  {/* Bouton Submit */}
                  <div className="flex items-center justify-between pt-4">
                    <p className="text-sm text-dark/60">
                      <span className="text-red-500">*</span> Champs obligatoires
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-bold text-lg hover:shadow-2xl 
hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 
11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Section FAQ rapide */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-dark to-primary bg-clip-text text-transparent">
                Questions Fréquentes
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  q: "Comment puis-je ajouter mon restaurant ?",
                  r: "Contactez-nous via ce formulaire avec les informations de votre établissement. Notre équipe vous répondra sous 24h."
                },
                {
                  q: "Les avis sont-ils vérifiés ?",
                  r: "Oui, tous les avis sont vérifiés par notre système pour garantir leur authenticité."
                },
                {
                  q: "Puis-je modifier mes préférences ?",
                  r: "Oui, rendez-vous dans votre profil pour personnaliser vos préférences culinaires."
                },
                {
                  q: "Comment signaler un problème ?",
                  r: "Utilisez ce formulaire en précisant 'Signalement' dans le sujet, nous traiterons votre demande en priorité."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 hover:shadow-xl transition-all 
duration-300">
                  <h3 className="font-bold text-dark mb-3 flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 
01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    {faq.q}
                  </h3>
                  <p className="text-dark/70 text-sm leading-relaxed">{faq.r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
