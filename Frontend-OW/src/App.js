import React, { Suspense, useState } from "react";
import "./components/FontawesomeIcons"
//import { NotificationContainer } from 'react-notifications';
import styled from "styled-components";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';
import { NotificationContainer } from 'react-notifications';
/*import 'react-notifications/lib/notifications.css';*/



import Routes from './utils/Routes'


const App = () => {

  
  return (
    <>
     
                  <AppFrame>
                 {/* <NotificationContainer/>*/}
                      <Routes />
                  </AppFrame> 
              
 
    </>
  )
}

const AppFrame = styled.div`
 
  
`;

export default App;
