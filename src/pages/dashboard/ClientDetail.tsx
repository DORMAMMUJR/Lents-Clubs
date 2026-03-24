import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Edit, Printer, FileText, User, Calendar, Phone, Clock } from "lucide-react";

export default function ClientDetail() {
  const { id } = useParams();

  // Simular datos del cliente
  const client = {
    id,
    folio: "OPT-2401",
    numeroNota: "001234",
    nombre: "María González",
    edad: 34,
    telefono: "(555) 123-4567",
    fechaRegistro: "15 Oct 2023",
    sintomas: "Visión borrosa al usar la computadora por tiempos prolongados. Dolor de cabeza frecuente por las tardes.",
    rx: {
      od: { esf: "-1.25", cil: "-0.50", eje: "180°" },
      oi: { esf: "-1.00", cil: "-0.75", eje: "175°" }
    },
    historial: [
      { fecha: "15 Oct 2023", accion: "Examen visual inicial", nota: "Se recomienda uso de lentes con filtro azul." },
      { fecha: "16 Oct 2023", accion: "Venta de armazón", nota: "Armazón Ray-Ban RX5154. Lentes policarbonato antireflejante." },
      { fecha: "20 Oct 2023", accion: "Entrega", nota: "Cliente satisfecho con la visión." }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{client.nombre}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 font-mono" title="Folio Interno">
                {client.folio}
              </span>
              {client.numeroNota && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 font-mono" title="Número de Nota">
                  Nota: {client.numeroNota}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-4">
              <span className="flex items-center gap-1"><User className="w-4 h-4" /> {client.edad} años</span>
              <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {client.telefono}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-full hover:bg-slate-50 transition-colors text-sm">
            <Printer className="w-4 h-4 mr-2" /> Imprimir Receta
          </button>
          <button className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-full hover:from-orange-600 hover:to-red-700 transition-all shadow-sm hover:shadow-md text-sm uppercase tracking-wider">
            <Edit className="w-4 h-4 mr-2" /> Editar Info
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Columna Izquierda: Detalles Clínicos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Receta */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Receta Actual
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Ojo</th>
                    <th className="px-4 py-3">Esfera</th>
                    <th className="px-4 py-3">Cilindro</th>
                    <th className="px-4 py-3 rounded-tr-lg">Eje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="px-4 py-4 font-semibold text-slate-700 font-sans">Derecho (OD)</td>
                    <td className="px-4 py-4">{client.rx.od.esf}</td>
                    <td className="px-4 py-4">{client.rx.od.cil}</td>
                    <td className="px-4 py-4">{client.rx.od.eje}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-semibold text-slate-700 font-sans">Izquierdo (OI)</td>
                    <td className="px-4 py-4">{client.rx.oi.esf}</td>
                    <td className="px-4 py-4">{client.rx.oi.cil}</td>
                    <td className="px-4 py-4">{client.rx.oi.eje}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Síntomas */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Motivo de Consulta / Síntomas</h2>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
              {client.sintomas}
            </p>
          </div>
        </div>

        {/* Columna Derecha: Historial y Meta */}
        <div className="space-y-6">
          {/* Info Registro */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Información</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Registrado</span>
                <span className="font-medium text-slate-900">{client.fechaRegistro}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Última visita</span>
                <span className="font-medium text-slate-900">20 Oct 2023</span>
              </div>
            </div>
          </div>

          {/* Timeline Historial */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Historial</h3>
              <button className="text-orange-600 text-sm font-medium hover:text-orange-700">Añadir nota</button>
            </div>
            
            <div className="relative border-l-2 border-slate-100 ml-3 space-y-8">
              {client.historial.map((item, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                  <div className="mb-1">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">{item.fecha}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">{item.accion}</h4>
                  <p className="text-sm text-slate-600 mt-1">{item.nota}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
