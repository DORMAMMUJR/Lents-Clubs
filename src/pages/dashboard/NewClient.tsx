import React, { useState, useRef, useEffect } from "react";
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
    addOD: "",
    esferaOI: "",
    cilindroOI: "",
    ejeOI: "",
    addOI: "",
    notas: ""
  });

  // Ref for auto-saving feature
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Load draft from localStorage if exists
    const draft = localStorage.getItem("newClientDraft");
    if (draft) {
      try {
        setFormData(JSON.parse(draft));
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }, []);

  useEffect(() => {
    // Auto-save draft
    const timer = setTimeout(() => {
      localStorage.setItem("newClientDraft", JSON.stringify(formData));
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Error al guardar");
      
      const data = await response.json();

      toast.success("Cliente y Orden guardados exitosamente", {
        description: `Folio generado: ${data.folio}`
      });
      localStorage.removeItem("newClientDraft");
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
            <h1 className="text-2xl font-bold text-slate-900">Nueva Orden / Cliente</h1>
            <p className="text-sm text-slate-500">Captura rápida optimizada para teclado (usa Tab).</p>
          </div>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
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
                autoFocus
                tabIndex={1}
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
                tabIndex={2}
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
                tabIndex={3}
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
              tabIndex={4}
              name="sintomas"
              value={formData.sintomas}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Ej. Visión borrosa de lejos, dolor de cabeza..."
            />
          </div>
        </div>

        {/* Graduación (Rx) - Optimizada para Teclado en Matriz */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" /> Receta Optométrica (Rx)
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-3 px-4 font-semibold text-slate-700 w-24">Ojo</th>
                  <th className="py-3 px-4 font-semibold text-slate-700">Esfera (Esf)</th>
                  <th className="py-3 px-4 font-semibold text-slate-700">Cilindro (Cil)</th>
                  <th className="py-3 px-4 font-semibold text-slate-700">Eje</th>
                  <th className="py-3 px-4 font-semibold text-slate-700">Adición (Add)</th>
                </tr>
              </thead>
              <tbody>
                {/* Ojo Derecho */}
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 font-bold text-slate-800 bg-slate-50/50">OD</td>
                  <td className="py-4 px-4">
                    <input
                      tabIndex={5}
                      name="esferaOD"
                      value={formData.esferaOD}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm text-center"
                      placeholder="-1.00"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <input
                      tabIndex={6}
                      name="cilindroOD"
                      value={formData.cilindroOD}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm text-center"
                      placeholder="-0.50"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <input
                      tabIndex={7}
                      name="ejeOD"
                      value={formData.ejeOD}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm text-center"
                      placeholder="180°"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <input
                      tabIndex={8}
                      name="addOD"
                      value={formData.addOD}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm text-center"
                      placeholder="+2.00"
                    />
                  </td>
                </tr>
                {/* Ojo Izquierdo */}
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-800 bg-slate-50/50">OI</td>
                  <td className="py-4 px-4">
                    <input
                      tabIndex={9}
                      name="esferaOI"
                      value={formData.esferaOI}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm text-center"
                      placeholder="-1.25"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <input
                      tabIndex={10}
                      name="cilindroOI"
                      value={formData.cilindroOI}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm text-center"
                      placeholder="-0.75"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <input
                      tabIndex={11}
                      name="ejeOI"
                      value={formData.ejeOI}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm text-center"
                      placeholder="175°"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <input
                      tabIndex={12}
                      name="addOI"
                      value={formData.addOI}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm text-center"
                      placeholder="+2.00"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Notas Adicionales */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notas Adicionales (Internas)</label>
            <textarea
              tabIndex={13}
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
            tabIndex={15}
            className="px-6 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-full hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            tabIndex={14}
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
                Guardar Orden
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
