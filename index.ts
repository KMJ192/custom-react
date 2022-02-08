import 'regenerator-runtime';

import React from '@react';
import { createStore } from '@redux';

import App from '@src/App';
import rootReducer from '@src/store/rootReducer';

const store = createStore(rootReducer);
React.render(App, document.getElementById('App'));

window.addEventListener('popstate', () => {
  React.routeRender();
});
