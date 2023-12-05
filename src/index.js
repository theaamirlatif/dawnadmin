import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from "react-router-dom"

window.api = "https://www.dawnanalyticals.com/backend/api/"
window.storage = "https://www.dawnanalyticals.com/backend/data/storage/app/"

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);


