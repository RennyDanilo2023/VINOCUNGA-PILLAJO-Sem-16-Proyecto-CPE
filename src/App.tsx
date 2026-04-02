import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Tabs from "./pages/Tabs";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/tabs" component={Tabs} />
        <Redirect exact from="/" to="/login" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;