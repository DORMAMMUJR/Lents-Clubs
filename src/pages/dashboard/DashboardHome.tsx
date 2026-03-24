import { Link } from "react-router-dom";
import { Users, UserPlus, Calendar, TrendingUp, Clock, ChevronRight } from "lucide-react";

export default function DashboardHome() {
  // Datos simulados
  const stats = [
    { name: "Clientes Totales", value: "1,245", icon: <Users className="w-6 h-6 text-blue-600" />, change: "+12% este mes" },
    { name: "Citas Hoy", value: "8", icon: <Calendar className="w-6 h-6 text-orange-600" />, change: "3 pendientes" },
    { name: "Ventas (Mes)", value: "$45,200", icon: <TrendingUp className="w-6 h-6 text-emerald-600" />, change: "+5% vs mes ant." },
  ];

  const recentClients = [
    { id: "1", name: "María González", folio: "OPT-2401", date: "Hace 2 horas", status: "Entregado" },
    { id: "2", name: "Juan Pérez", folio: "OPT-2402", date: "Hace 4 horas", status: "En proceso" },
    { id: "3", name: "Ana López", folio: "OPT-2403", date: "Ayer", status: "Pendiente" },
    { id: "4", name: "Carlos Ruiz", folio: "OPT-2404", date: "Ayer", status: "Entregado" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bienvenido al Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Aquí tienes un resumen de la actividad de hoy.</p>
        </div>
        <Link
          to="/dashboard/clientes/nuevo"
          className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 h-10 px-6 shadow-md hover:shadow-lg uppercase tracking-wider"
        >
          <UserPlus className="w-4 h-4" />
          Nuevo Cliente
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                i === 0 ? 'bg-blue-50' : i === 1 ? 'bg-orange-50' : 'bg-emerald-50'
              }`}>
                {stat.icon}
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Clients List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Clientes Recientes</h2>
            <Link to="/dashboard/clientes" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
              Ver todos <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentClients.map((client) => (
              <Link
                key={client.id}
                to={`/dashboard/clientes/${client.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium text-sm">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{client.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 font-mono">{client.folio}</span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {client.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    client.status === 'Entregado' ? 'bg-emerald-100 text-emerald-800' :
                    client.status === 'En proceso' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {client.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Citas de Hoy</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[
                { time: "10:00 AM", name: "Roberto Gómez", type: "Examen visual" },
                { time: "11:30 AM", name: "Lucía Fernández", type: "Entrega de lentes" },
                { time: "04:00 PM", name: "Miguel Ángel", type: "Ajuste de armazón" },
              ].map((apt, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== 2 && <div className="absolute left-2.5 top-6 bottom-[-24px] w-px bg-slate-200"></div>}
                  <div className="w-5 h-5 rounded-full border-2 border-blue-600 bg-white z-10 mt-0.5 shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{apt.time}</p>
                    <p className="text-sm font-medium text-slate-700 mt-0.5">{apt.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{apt.type}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-2 border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              Ver calendario completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
