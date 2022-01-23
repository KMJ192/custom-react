import React from '@react';
import App from '@src/App';

React.render(App, document.getElementById('App'));

window.addEventListener('popstate', () => {
  React.render(App, document.getElementById('App'));
});
