import React from "react";
import { Link } from "react-router-dom";
import { Eye, MapPin, Phone, Mail, ChevronRight, CheckCircle2, Search, Calendar, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span 
              className="text-4xl font-['Dancing_Script'] text-white drop-shadow-md tracking-wide"
              style={{ WebkitTextStroke: '1.5px #1d4ed8' }}
            >
              Lents Clubs
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#ofertas" className="text-base font-bold text-slate-800 hover:text-blue-700 transition-colors uppercase tracking-wide">Promociones</a>
            <a href="#catalogo" className="text-base font-bold text-slate-800 hover:text-blue-700 transition-colors uppercase tracking-wide">Catálogo</a>
            <a href="#contacto" className="text-base font-bold text-slate-800 hover:text-blue-700 transition-colors uppercase tracking-wide">Contacto</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 h-12 px-8 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 uppercase tracking-wider"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative bg-[#FFD700] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-2xl z-10">
                <div className="flex flex-col space-y-2 mb-8">
                  <span className="text-5xl sm:text-7xl font-black text-black uppercase tracking-tighter leading-none">
                    EXAMEN
                  </span>
                  <span className="text-5xl sm:text-7xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-md" style={{ WebkitTextStroke: '2px black' }}>
                    DE LA VISTA
                  </span>
                  <span className="text-5xl sm:text-7xl font-black text-blue-700 uppercase tracking-tighter leading-none">
                    GRATIS
                  </span>
                </div>
                <p className="text-xl sm:text-2xl text-black font-medium mb-10 leading-relaxed max-w-lg">
                  En la compra de tus lentes completos. Descubre la mejor tecnología para tus ojos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#ofertas"
                    className="inline-flex items-center justify-center rounded-full text-lg font-bold transition-all bg-black text-white hover:bg-slate-800 h-14 px-10 shadow-xl uppercase tracking-wider"
                  >
                    Ver Promociones
                    <ChevronRight className="ml-2 w-6 h-6" />
                  </a>
                </div>
              </div>
              <div className="relative lg:block">
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
                
                {/* Image Collage */}
                <div className="relative grid grid-cols-2 gap-4 transform rotate-3">
                  <img
                    src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Modelo con lentes"
                    className="rounded-2xl shadow-2xl object-cover h-[300px] w-full border-4 border-white"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Modelo con lentes de sol"
                    className="rounded-2xl shadow-2xl object-cover h-[300px] w-full border-4 border-white mt-12"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ofertas 2x1 */}
        <section id="ofertas" className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Promociones Especiales</h2>
              <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Promo 1 */}
              <div className="bg-[#FFD700] rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-red-600 text-white font-black text-2xl px-6 py-2 rounded-bl-3xl z-10">
                  2x1
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-black uppercase mb-4 leading-tight">
                    Lentes <br/>Monofocales
                  </h3>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-black font-medium text-lg">
                      <CheckCircle2 className="w-6 h-6 text-blue-700 shrink-0" />
                      Armazón a elegir
                    </li>
                    <li className="flex items-center gap-3 text-black font-medium text-lg">
                      <CheckCircle2 className="w-6 h-6 text-blue-700 shrink-0" />
                      Mica Antireflejante
                    </li>
                    <li className="flex items-center gap-3 text-black font-medium text-lg">
                      <CheckCircle2 className="w-6 h-6 text-blue-700 shrink-0" />
                      Estuche y paño
                    </li>
                  </ul>
                  <p className="text-4xl font-black text-red-600 mb-2">$1,499 <span className="text-lg text-black font-bold">MXN</span></p>
                  <p className="text-sm font-bold text-slate-800 uppercase">*Llévate el segundo par GRATIS</p>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-20 group-hover:scale-110 transition-transform duration-500">
                  <Eye className="w-64 h-64 text-black" />
                </div>
              </div>

              {/* Promo 2 */}
              <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black text-2xl px-6 py-2 rounded-bl-3xl z-10">
                  2x1
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-white uppercase mb-4 leading-tight">
                    Lentes <br/>Bifocales
                  </h3>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-slate-300 font-medium text-lg">
                      <CheckCircle2 className="w-6 h-6 text-[#FFD700] shrink-0" />
                      Armazón de marca
                    </li>
                    <li className="flex items-center gap-3 text-slate-300 font-medium text-lg">
                      <CheckCircle2 className="w-6 h-6 text-[#FFD700] shrink-0" />
                      Mica con protección Blue Ray
                    </li>
                    <li className="flex items-center gap-3 text-slate-300 font-medium text-lg">
                      <CheckCircle2 className="w-6 h-6 text-[#FFD700] shrink-0" />
                      Garantía de 1 año
                    </li>
                  </ul>
                  <p className="text-4xl font-black text-[#FFD700] mb-2">$2,899 <span className="text-lg text-white font-bold">MXN</span></p>
                  <p className="text-sm font-bold text-slate-400 uppercase">*Llévate el segundo par GRATIS</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Inset */}
        <section className="bg-slate-50 py-24 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Gestión Profesional</h2>
              <p className="text-lg text-slate-600">Un vistazo a nuestra plataforma interna para brindarte el mejor servicio.</p>
            </div>
            
            {/* Mockup Dashboard */}
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Mockup Header */}
              <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-['Dancing_Script'] text-white" style={{ WebkitTextStroke: '1px #1d4ed8' }}>
                    Lents Clubs
                  </span>
                </div>
                <div className="hidden sm:flex items-center bg-slate-100 rounded-md px-3 py-1.5 w-64">
                  <Search className="w-4 h-4 text-slate-400 mr-2" />
                  <span className="text-sm text-slate-400">Buscar paciente...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white text-xs font-bold">
                    AD
                  </div>
                </div>
              </div>
              
              {/* Mockup Body */}
              <div className="flex h-96">
                {/* Sidebar */}
                <div className="w-48 border-r border-slate-200 bg-slate-50 p-4 hidden md:block">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-blue-700 bg-blue-50 px-3 py-2 rounded-md text-sm font-medium">
                      <Calendar className="w-4 h-4" /> Citas Hoy
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 px-3 py-2 rounded-md text-sm font-medium">
                      <Users className="w-4 h-4" /> Pacientes
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 p-6 bg-white relative">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Próximas Citas</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                            {i === 1 ? 'MG' : i === 2 ? 'JP' : 'AL'}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{i === 1 ? 'María González' : i === 2 ? 'Juan Pérez' : 'Ana López'}</p>
                            <p className="text-xs text-slate-500">Examen visual</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                          {i === 1 ? '10:00 AM' : i === 2 ? '11:30 AM' : '04:00 PM'}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Mock Toast */}
                  <div className="absolute bottom-6 right-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-bold">Guardado Exitoso</p>
                      <p className="text-xs text-emerald-600">El paciente ha sido registrado.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (Banda Negra) */}
      <footer id="contacto" className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <span 
                  className="text-4xl font-['Dancing_Script'] text-white drop-shadow-md"
                  style={{ WebkitTextStroke: '1px #1d4ed8' }}
                >
                  Lents Clubs
                </span>
              </div>
              <h4 className="text-xl font-bold mb-6 text-[#FFD700] uppercase tracking-wider">Contáctanos</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-full shrink-0">
                    <MapPin className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Visítanos en:</p>
                    <p className="text-slate-300 mt-1">Av. Norte no. 145 Local "B",<br />Col. Agrícola Pantitlán</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-slate-800 p-3 rounded-full shrink-0">
                    <Phone className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Llámanos:</p>
                    <p className="text-slate-300 mt-1 text-xl">55 3431 3615</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-slate-800 rounded-2xl p-2 h-[300px] relative overflow-hidden shadow-2xl border border-slate-700">
              {/* We use an iframe for a generic map view to simulate the real map */}
              <iframe 
                src="https://www.google.com/maps?q=Av.+Norte+no.+145+Local+B,+Col.+Agrícola+Pantitlán&output=embed" 
                className="w-full h-full rounded-xl opacity-80 grayscale contrast-125" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-white/10"></div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-16 pt-8 text-center text-sm text-slate-500 font-medium">
            © {new Date().getFullYear()} Lents Clubs. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
