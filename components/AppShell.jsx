import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';

import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'
import Menu from './Menu';

import Home from './pages/Home';
import ApolloProvider from '../apollo/Provider'
import Category from './pages/Category';

window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
  try {
    await StatusBar.setStyle({
      style: status.matches ? Style.Dark : Style.Light,
    });
  } catch {}
});

const AppShell = () => {
  return (
    <IonApp>
      <ApolloProvider>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/home" render={() => <Home />} />
              <Route path="/category/:slug" render={(routeProps) => <Category slug={routeProps.match.params.slug} /> } />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </ApolloProvider>
    </IonApp>
  );
};

export default AppShell;
