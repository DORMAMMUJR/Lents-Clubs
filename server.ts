import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";

// Mock Database
let clients = [
  { id: "1", folio: "OPT-2401", numeroNota: "001234", nombre: "María González", telefono: "(555) 123-4567", edad: 34, fechaRegistro: "2023-10-15" },
  { id: "2", folio: "OPT-2402", numeroNota: "001235", nombre: "Carlos Ruiz", telefono: "(555) 987-6543", edad: 45, fechaRegistro: "2023-10-16" },
  { id: "3", folio: "OPT-2403", numeroNota: "001236", nombre: "Ana López", telefono: "(555) 456-7890", edad: 28, fechaRegistro: "2023-10-17" },
];

let orders = [
  { id: "101", folio: "ORD-001", clientId: "1", status: "READY", totalAmount: 1500, advancePayment: 500, updatedAt: "2023-10-10" },
  { id: "102", folio: "ORD-002", clientId: "2", status: "IN_PROCESS", totalAmount: 2200, advancePayment: 1000, updatedAt: "2023-10-16" },
  { id: "103", folio: "ORD-003", clientId: "3", status: "PENDING", totalAmount: 1800, advancePayment: 900, updatedAt: "2023-10-17" },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- API ROUTES ---

  // Dashboard summary
  app.get("/api/dashboard/summary", (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const pending = orders.filter(o => o.status === "PENDING").length;
    const ready = orders.filter(o => o.status === "READY").length;
    // Simulate alerts (Ready for more than 7 days)
    const alerts = orders.filter(o => o.status === "READY").length; 
    
    res.json({
      appointmentsToday: 5,
      pendingOrders: pending,
      readyOrders: ready,
      alerts: alerts
    });
  });

  // Global Search
  app.get("/api/search", (req, res) => {
    const q = (req.query.q as string || "").toLowerCase();
    if (!q) return res.json([]);

    const matchedClients = clients.filter(c => 
      c.nombre.toLowerCase().includes(q) || 
      c.telefono.includes(q) || 
      c.folio.toLowerCase().includes(q) ||
      (c.numeroNota && c.numeroNota.toLowerCase().includes(q))
    ).map(c => ({ type: 'client', ...c }));

    const matchedOrders = orders.filter(o => 
      o.folio.toLowerCase().includes(q)
    ).map(o => {
      const client = clients.find(c => c.id === o.clientId);
      return { type: 'order', ...o, clientName: client?.nombre };
    });

    res.json([...matchedClients, ...matchedOrders]);
  });

  // Create Client
  app.post("/api/clients", (req, res) => {
    const newClient = {
      id: Date.now().toString(),
      folio: `OPT-${Math.floor(Math.random() * 10000)}`,
      fechaRegistro: new Date().toISOString().split('T')[0],
      ...req.body
    };
    clients.push(newClient);
    res.status(201).json(newClient);
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
