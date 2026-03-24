import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2, User, Phone, FileText, Activity } from "lucide-react";
import { toast } from "sonner";

export default function NewClient() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    telefono: "",
    sintomas: "",
    esferaOD: "",
    cilindroOD: "",
    ejeOD: "",
    esferaOI: "",
    cilindroOI: "",
    ejeOI: "",
    notas: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular llamada a API / DB
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simular éxito 80% de las veces
          if (Math.random() > 0.2) resolve(true);
          else reject(new Error("Error de conexión"));
        }, 1500);
      });

      toast.success("Cliente guardado exitosamente", {
        description: `Folio generado: OPT-${Math.floor(Math.random() * 10000)}`
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error al guardar el cliente", {
        description: "Por favor intenta de nuevo más tarde."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Nuevo Cliente</h1>
            <p className="text-sm text-slate-500">Registra un nuevo paciente y su graduación.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Datos Personales */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" /> Datos Personales
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo *</label>
              <input
                required
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej. Juan Pérez García"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Edad</label>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Años"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-4 h-4 text-slate-400" /> Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Historial Clínico */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" /> Historial Clínico
          </h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Síntomas / Motivo de consulta</label>
            <textarea
              name="sintomas"
              value={formData.sintomas}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Ej. Visión borrosa de lejos, dolor de cabeza..."
            />
          </div>
        </div>

        {/* Graduación (Rx) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" /> Receta Optométrica (Rx)
          </h2>
          
          <div className="space-y-6">
            {/* Ojo Derecho */}
            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-3 bg-slate-50 p-2 rounded border border-slate-100">Ojo Derecho (OD)</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Esfera (Esf)</label>
                  <input
                    name="esferaOD"
                    value={formData.esferaOD}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="-1.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Cilindro (Cil)</label>
                  <input
                    name="cilindroOD"
                    value={formData.cilindroOD}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="-0.50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Eje</label>
                  <input
                    name="ejeOD"
                    value={formData.ejeOD}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="180°"
                  />
                </div>
              </div>
            </div>

            {/* Ojo Izquierdo */}
            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-3 bg-slate-50 p-2 rounded border border-slate-100">Ojo Izquierdo (OI)</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Esfera (Esf)</label>
                  <input
                    name="esferaOI"
                    value={formData.esferaOI}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="-1.25"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Cilindro (Cil)</label>
                  <input
                    name="cilindroOI"
                    value={formData.cilindroOI}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="-0.75"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Eje</label>
                  <input
                    name="ejeOI"
                    value={formData.ejeOI}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="175°"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notas Adicionales */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notas Adicionales (Internas)</label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Preferencias de armazón, presupuesto, etc."
            />
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-end gap-4 pt-4 pb-12">
          <Link
            to="/dashboard"
            className="px-6 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-full hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-8 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-full hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-all shadow-md hover:shadow-lg uppercase tracking-wider min-w-[180px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Guardar Cliente
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
