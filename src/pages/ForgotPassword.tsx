import {
  IonButton,
  IonContent,
  IonInput,
  IonLabel,
  IonPage,
  IonText,
} from "@ionic/react";
import { useState } from "react";
import "./Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await fetch("https://aplicaciones.uta.edu.ec:3000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo enviar el correo");
      }

      setMessage("Se ha enviado un correo para recuperar la contraseña.");
    } catch (error: any) {
      setMessage(error.message || "Error al enviar correo");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-background">
        <div className="center-wrapper">
          <div className="login-box">
            <h2>Recuperar contraseña</h2>
            <p>Ingresa tu correo para recuperar tu cuenta</p>

            {message && (
              <IonText color="warning">
                <p className="error-message">{message}</p>
              </IonText>
            )}

            <IonLabel position="floating">Correo electrónico</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              required
              placeholder="usuario@correo.com"
            />

            <IonButton
              expand="block"
              color="medium"
              onClick={handleForgotPassword}
              disabled={!email}
            >
              Recuperar contraseña
            </IonButton>

            <IonButton expand="block" fill="clear" routerLink="/login">
              Volver al inicio de sesión
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
