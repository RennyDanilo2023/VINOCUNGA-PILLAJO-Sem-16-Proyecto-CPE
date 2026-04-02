import React, { useState } from "react";
import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import "./Login.css";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useIonRouter();

  const handleRegister = () => {
    setMessage("");

    if (!email || !password) {
      setMessage("Complete el correo y la contraseña");
      return;
    }

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const existeUsuario = usuariosGuardados.some(
      (u: { email: string }) => u.email === email
    );

    if (existeUsuario) {
      setMessage("Ese correo ya se encuentra registrado");
      return;
    }

    const nuevoUsuario = { email, password };
    usuariosGuardados.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
    setMessage("Cuenta creada correctamente");

    setTimeout(() => {
      router.push("/login", "root");
    }, 1400);
  };

  return (
    <IonPage>
      <IonContent className="login-page">
        <div className="login-wrapper">
          <div className="login-card">
            <div className="logo-circle">📝</div>

            <h1>Registro</h1>
            <h2>Creación de cuenta local</h2>
            <p className="subtitle">
              Registre un usuario para ingresar al sistema y gestionar los cálculos ambientales.
            </p>

            {message && <div className="message-box">{message}</div>}

            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="usuario@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Ingrese una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="main-button" onClick={handleRegister}>
              Registrar cuenta
            </button>

            <button
              className="secondary-button"
              type="button"
              onClick={() => router.push("/login", "back")}
            >
              Volver al inicio de sesión
            </button>

            <div className="footer-box">
              <p className="footer-name">MSc Reni Danilo Vinocunga-Pillajo Ing.</p>
              <p className="footer-role">Investigador Agregado 2</p>
              <p className="mini-note">Aplicación desarrollada para fines académicos y demostrativos</p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;