import 'regenerator-runtime';

import React from '@react';
import App from '@src/App';

import './style.css';

React.render(App, document.getElementById('App'));

window.addEventListener('popstate', () => {
  React.routeRender();
});
