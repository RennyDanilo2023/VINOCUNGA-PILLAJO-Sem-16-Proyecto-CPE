import React from 'react';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet
} from '@ionic/react';
import { Route } from 'react-router-dom';
import { calculatorOutline, barChartOutline } from 'ionicons/icons';

import TabCalculo from './TabCalculo';
import TabResultados from './TabResultados';

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/calculo" component={TabCalculo} />
        <Route exact path="/tabs/resultados" component={TabResultados} />
      </IonRouterOutlet>

      {/* Barra inferior con estilo crema */}
      <IonTabBar
        slot="bottom"
        style={{
          backgroundColor: "#fffde7",  // color crema
          borderTop: "1px solid #ccc",
          borderRadius: "10px 10px 0 0"
        }}
      >
        <IonTabButton tab="calculo" href="/tabs/calculo">
          <IonIcon icon={calculatorOutline} />
          <IonLabel>Cálculo</IonLabel>
        </IonTabButton>

        <IonTabButton tab="resultados" href="/tabs/resultados">
          <IonIcon icon={barChartOutline} />
          <IonLabel>Resultados</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
