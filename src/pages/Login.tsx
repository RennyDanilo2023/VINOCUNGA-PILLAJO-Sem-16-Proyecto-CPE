import React, { useState } from "react";
import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import "./Login.css";

const Login: React.FC = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const router = useIonRouter();

  const handleLogin = () => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const usuarioEncontrado = usuariosGuardados.find(
      (u: { email: string; password: string }) =>
        u.email === correo && u.password === contrasena
    );

    if (usuarioEncontrado) {
      localStorage.setItem(
        "usuarioActivo",
        JSON.stringify({ email: usuarioEncontrado.email })
      );
      router.push("/tabs/calculo", "root");
    } else {
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <IonPage>
      <IonContent className="login-page">
        <div className="login-wrapper">
          <div className="login-card">
            <div className="logo-circle">🌿</div>

            <h1>TRACI</h1>
            <h2>Tool for Reduction and Assessment of Chemicals and Other Environmental Impacts</h2>
            <p className="subtitle">
              Ingrese con su cuenta para acceder al módulo de cálculo de impactos ambientales.
            </p>

            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="Ingrese su correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
            </div>

            <button className="main-button" onClick={handleLogin}>
              Iniciar sesión
            </button>

            <button
              className="secondary-button"
              type="button"
              onClick={() => router.push("/register", "forward")}
            >
              Crear cuenta
            </button>

            <div className="footer-box">
              <p className="footer-name">MSc Reni Danilo Vinocunga-Pillajo Ing.</p>
              <p className="footer-role">Investigador Agregado 2</p>
              <p className="mini-note">Sistema académico para evaluación de impactos ambientales</p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;