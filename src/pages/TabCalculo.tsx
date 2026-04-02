import React, { useState, useEffect } from "react";
import { IonPage, IonContent } from "@ionic/react";
import "./TabCalculo.css";

// Factores TRACI
const FACTORES_TRACI = {
  lena: { factor: 0.1, unidad: "kg SO₂ eq" },
  agua: { factor: 0.05, unidad: "kg N eq" },
  transporte: { factor: 2.31, unidad: "kg CO₂ eq" },
};

const TabCalculo: React.FC = () => {
  const [lena, setLena] = useState<number>(0);
  const [agua, setAgua] = useState<number>(0);
  const [transporte, setTransporte] = useState<number>(0);

  // Si es edición, cargar valores previos
  useEffect(() => {
    const editarId = localStorage.getItem("editarId");
    if (editarId) {
      let historial = JSON.parse(localStorage.getItem("historial") || "[]");
      const item = historial.find((i: any) => i.id.toString() === editarId);
      if (item) {
        setLena(item.valores.lena);
        setAgua(item.valores.agua);
        setTransporte(item.valores.transporte);
      }
    }
  }, []);

  // Calcular impactos
  const calcularImpactos = (valores: any) => {
    return {
      lena: valores.lena * FACTORES_TRACI.lena.factor,
      agua: valores.agua * FACTORES_TRACI.agua.factor,
      transporte: valores.transporte * FACTORES_TRACI.transporte.factor,
    };
  };

  // Guardar resultados en historial
  const handleSubmit = () => {
    const valores = { lena, agua, transporte };
    const impactos = calcularImpactos(valores);

    let historial = JSON.parse(localStorage.getItem("historial") || "[]");

    const editarId = localStorage.getItem("editarId");
    if (editarId) {
      // 🔄 Actualizar
      historial = historial.map((item: any) =>
        item.id === editarId ? { ...item, valores, impactos } : item
      );
      localStorage.removeItem("editarId");
      alert("✏️ Impacto actualizado correctamente.");
    } else {
      // ➕ Crear nuevo con ID amigable
      const nuevoId = `ID-${(historial.length + 1).toString().padStart(3, "0")}`;
      historial.push({ id: nuevoId, valores, impactos });
      alert("✅ Impacto guardado en historial.");
    }

    localStorage.setItem("historial", JSON.stringify(historial));
  };

  // Ver resultados
  const handleVerResultados = () => {
    window.location.href = "/tabs/resultados";
  };

  // Reiniciar formulario
  const handleReiniciar = () => {
    setLena(0);
    setAgua(0);
    setTransporte(0);
    localStorage.removeItem("editarId");
    alert("🔄 Formulario reiniciado.");
  };

  // Salir
  const handleSalir = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="form-wrapper">
          <div className="form-card">
            <h2>🌱 Impactos Ambientales en la Amazonía</h2>
            <p>
              Esta calculadora usa la metodología <b>TRACI</b>, que traduce
              consumos en <b>impactos ambientales</b>.
            </p>

            <label>🌳 Consumo de leña (kg/día)</label>
            <input type="number" value={lena} onChange={(e) => setLena(Number(e.target.value))} />

            <label>💧 Uso de agua en chacras (litros/día)</label>
            <input type="number" value={agua} onChange={(e) => setAgua(Number(e.target.value))} />

            <label>🚜 Emisiones por transporte (litros gasolina/semana)</label>
            <input type="number" value={transporte} onChange={(e) => setTransporte(Number(e.target.value))} />

            <button className="btn-calcular" onClick={handleSubmit}>🌍 Guardar Impacto</button>

            <div className="extra-buttons">
              <button className="btn-resultados" onClick={handleVerResultados}>📊 Ver Resultados</button>
              <button className="btn-reiniciar" onClick={handleReiniciar}>🔄 Reiniciar</button>
              <button className="btn-salir" onClick={handleSalir}>🚪 Salir</button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabCalculo;
