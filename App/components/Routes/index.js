import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Login from '../Login';
import Profile from '../Profile';
import Welcome from '../Welcome';
import Seriea from '../Profile/Seriea';
import ProyectoSeriea from '../Profile/ProyectoSeriea';
import MyInfo from '../Profile/MyInfo';
import Documents from '../Profile/Documents';
import PlaceHolder from '../PlaceHolder';
import CarpetaLegal from '../CarpetaLegal';
import NuevoVehicle from '../NuevoVehicle';
import Firma from '../Firma';
import VehicleDetail from '../CarpetaLegal/VehicleDetail';
import AddDocuments from '../CarpetaLegal/AddDocuments';
import SeriesDocumentsInvestors from '../Profile/SeriesDocumentsInvestors';
import AddDocumentsToSerie from '../Profile/AddDocumentsToSerie';
import EstadoDeCuenta from '../Menu/EstadoDeCuenta';
import Legales from '../Menu/Legales';
import Contacto from '../Menu/Contacto';
import Notificaciones from '../Menu/Notificaciones';

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene key="start" component={PlaceHolder} initial={true} />
      <Scene key="welcome" component={Welcome} hideNavBar />
      <Scene key="login" component={Login} hideNavBar />
      <Scene key="profile" component={Profile} hideNavBar />
      <Scene key="seriesDocumentsInvestors" component={SeriesDocumentsInvestors} hideNavBar />
      <Scene key="carpetaLegal" component={CarpetaLegal} hideNavBar />
      <Scene key="vehicleDetail" component={VehicleDetail} hideNavBar />
      <Scene key="addDocuments" component={AddDocuments} hideNavBar />
      <Scene key="nuevoVehicle" component={NuevoVehicle} hideNavBar />
      <Scene key="firma" component={Firma} hideNavBar />
      <Scene key="seriea" component={Seriea} hideNavBar />
      <Scene key="proyectoseriea" component={ProyectoSeriea} hideNavBar />
      <Scene key="myinfo" component={MyInfo} hideNavBar />
      <Scene key="addDocumentsToSerie" component={AddDocumentsToSerie} hideNavBar />
      <Scene key="documents" component={Documents} hideNavBar />
      <Scene key="estado" component={EstadoDeCuenta} hideNavBar />
      <Scene key="legales" component={Legales} hideNavBar />
      <Scene key="contacto" component={Contacto} hideNavBar />
      <Scene key="notificaciones" component={Notificaciones} hideNavBar />
    </Scene>
  </Router>
);
export default Routes;

