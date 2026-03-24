import React, { useState, useEffect, useRef } from 'react';
import { Search, User, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Toggle with Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search API
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setSelectedIndex(0);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  // Keyboard navigation within results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (results.length || 1)) % (results.length || 1));
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  const handleSelect = (item: any) => {
    setIsOpen(false);
    if (item.type === 'client') {
      navigate(`/dashboard/clientes/${item.id}`);
    } else if (item.type === 'order') {
      // Navigate to order detail (assuming it exists or fallback to client)
      navigate(`/dashboard/clientes/${item.clientId}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[20vh]">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 py-3 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-lg"
            placeholder="Buscar por nombre, teléfono, folio o nota (Ej. OPT-2401)..."
          />
          {isLoading && <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />}
          <div className="hidden sm:flex items-center gap-1 ml-3">
            <kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs text-slate-500 font-mono">ESC</kbd>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query && results.length === 0 && !isLoading && (
            <div className="py-14 text-center text-slate-500">
              No se encontraron resultados para "{query}"
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-1">
              {results.map((item, idx) => (
                <button
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    idx === selectedIndex ? 'bg-blue-50 text-blue-900' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${item.type === 'client' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                      {item.type === 'client' ? <User className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">
                        {item.type === 'client' ? item.nombre : `Orden ${item.folio}`}
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.type === 'client' ? `${item.folio} ${item.numeroNota ? `• Nota: ${item.numeroNota}` : ''} • ${item.telefono}` : `Cliente: ${item.clientName} • Estado: ${item.status}`}
                      </div>
                    </div>
                  </div>
                  {idx === selectedIndex && <ArrowRight className="w-4 h-4 text-blue-500" />}
                </button>
              ))}
            </div>
          )}

          {!query && (
            <div className="py-8 px-4 text-center">
              <p className="text-sm text-slate-500 mb-4">Sugerencias de búsqueda</p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">Juan Pérez</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">OPT-</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">555-</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">↑</kbd><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">↓</kbd> Navegar</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">↵</kbd> Seleccionar</span>
          </div>
          <span className="font-medium text-slate-400">Lents Clubs Search</span>
        </div>
      </div>
    </div>
  );
}
