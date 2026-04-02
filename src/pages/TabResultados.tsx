import React, { useState, useEffect } from "react";
import { IonPage, IonContent } from "@ionic/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./TabResultados.css";

const FACTORES_TRACI = {
  lena: { factor: 0.1, unidad: "kg SO₂ eq", categoria: "Acidificación" },
  agua: { factor: 0.05, unidad: "kg N eq", categoria: "Eutrofización" },
  transporte: { factor: 2.31, unidad: "kg CO₂ eq", categoria: "Cambio climático" },
};

const COLORS = ["#4CAF50", "#2196F3", "#FF9800"];

const TabResultados: React.FC = () => {
  const valores = JSON.parse(localStorage.getItem("valores") || "{}");
  const impactos = JSON.parse(localStorage.getItem("impactos") || "{}");
  const historialGuardado = JSON.parse(localStorage.getItem("historial") || "[]");

  const [historial, setHistorial] = useState<any[]>(historialGuardado);

  // Editar registro
  const handleEditar = (id: string) => {
    localStorage.setItem("editarId", id);
    window.location.href = "/tabs/calculo";
  };

  // Eliminar registro
  const handleEliminar = (id: string) => {
    const nuevoHistorial = historial.filter((item) => item.id !== id);
    setHistorial(nuevoHistorial);
    localStorage.setItem("historial", JSON.stringify(nuevoHistorial));
    alert(`🗑️ Registro ${id} eliminado`);
  };

  // ✅ Control cuando no hay datos
  if (historial.length === 0) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>⚠️ No hay resultados calculados</h2>
            <p>Por favor, ingrese datos en la pestaña de cálculo.</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // Datos para gráficas
  const ultimo = historial[historial.length - 1]; // el último registro
  const dataBar = [
    { name: "Leña", value: ultimo.impactos.lena },
    { name: "Agua", value: ultimo.impactos.agua },
    { name: "Transporte", value: ultimo.impactos.transporte },
  ];

  const dataPie = [
    { name: `Leña (${FACTORES_TRACI.lena.unidad})`, value: ultimo.impactos.lena },
    { name: `Agua (${FACTORES_TRACI.agua.unidad})`, value: ultimo.impactos.agua },
    { name: `Transporte (${FACTORES_TRACI.transporte.unidad})`, value: ultimo.impactos.transporte },
  ];

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="results-wrapper">
          <div className="results-card">
            <h2>📊 Resultados Ambientales en la Amazonía</h2>
            <p>
              Según la metodología <b>TRACI</b>, los valores ingresados se convierten en
              <b> impactos ambientales</b> expresados en unidades de equivalencia.
            </p>

            {/* Figura 1 */}
            <h3>📊 Figura 1. Impactos ambientales por recurso</h3>
            <BarChart width={350} height={200} data={dataBar}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>

            {/* Figura 2 */}
            <h3>🥧 Figura 2. Distribución relativa de impactos</h3>
            <PieChart width={350} height={250}>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>

            {/* Tabla con ID amigable */}
            <h3>📑 Tabla 1. Historial de impactos ambientales</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Leña</th>
                  <th>Agua</th>
                  <th>Transporte</th>
                  <th>Impacto Leña</th>
                  <th>Impacto Agua</th>
                  <th>Impacto Transporte</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.valores.lena}</td>
                    <td>{item.valores.agua}</td>
                    <td>{item.valores.transporte}</td>
                    <td>{item.impactos.lena.toFixed(2)} {FACTORES_TRACI.lena.unidad}</td>
                    <td>{item.impactos.agua.toFixed(2)} {FACTORES_TRACI.agua.unidad}</td>
                    <td>{item.impactos.transporte.toFixed(2)} {FACTORES_TRACI.transporte.unidad}</td>
                    <td>
                      <button onClick={() => handleEditar(item.id)}>✏️ Editar</button>
                      <button onClick={() => handleEliminar(item.id)}>🗑️ Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabResultados;
