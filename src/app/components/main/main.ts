// Svelte Component
import App from './main.sve';

const Main = (rootEl) => {
  const app = new App({
    target: document.querySelector(rootEl),
  });

  (<any>window).app = app; // for testing purposes only

  // detach the component and clean everything up
  // app.teardown();
};

export {
  Main
}