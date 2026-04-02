import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';

const Home: React.FC = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const usuario = "danilovinocunga@gmail.com"; // o podrías leerlo de localStorage

  useEffect(() => {
    // Ejemplo de API pública
    fetch("https://fakestoreapi.com/products?limit=5")
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>¡Sesión iniciada correctamente!</h2>
          <p>Bienvenido <b>{usuario}</b></p>

          <h3>Productos disponibles:</h3>
          <ul style={{ textAlign: 'left', maxWidth: '400px', margin: 'auto' }}>
            {productos.map(p => (
              <li key={p.id}>{p.title} - ${p.price}</li>
            ))}
          </ul>

          <button
            onClick={handleLogout}
            style={{ marginTop: '20px', padding: '10px 20px', background: '#e91e63', color: 'white', border: 'none', borderRadius: '8px' }}
          >
            Cerrar sesión
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
