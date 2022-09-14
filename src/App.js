import React from 'react';
import Body from './layout/Body/Body';
import Footer from './layout/footer/Footer';
import Header from './layout/header/Header';
import Scrolltop from './layout/funationality/Scrolltop'
import MobileWrapper from './layout/funationality/MobileWrapper';
import StickyFooter from './layout/funationality/StickyFooter';
import { BrowserRouter} from "react-router-dom";
const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header/>
        <Body/>
        <Footer/>
        <StickyFooter/>
        <Scrolltop/>
        <MobileWrapper/>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
