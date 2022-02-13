import 'regenerator-runtime';

import React from '@react';
import { createStore, applyMiddleware } from '@redux';

import App from '@src/App';
import rootReducer, { rootAsyncMiddleware } from '@src/store/rootReducer';

const store = createStore(rootReducer, applyMiddleware(rootAsyncMiddleware));
React.render(
  {
    store,
    reactApp: App,
  },
  document.getElementById('App'),
);

window.addEventListener('popstate', () => {
  React.routeRender();
});
