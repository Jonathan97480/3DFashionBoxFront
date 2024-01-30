import React from 'react';
import logo from './logo.svg';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home, AddGame, AddGameAuto } from './Pages';
import { ReactNotifications } from 'react-notifications-component'
import { setTranslations, setDefaultLanguage } from 'react-multi-lang'
import 'react-notifications-component/dist/theme.css'
import { Provider } from 'react-redux';
import store from './redux/store';
import en from './lang/en.json'
import fr from './lang/fr.json'
import './App.css';



setTranslations({ fr })
setDefaultLanguage('fr')

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ReactNotifications />
        <HashRouter>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addGame" element={<AddGame />} />
            <Route path="/AddGameAuto" element={<AddGameAuto />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
