// Svelte Component
import App from './main.sve';

const Main = (rootEl) => {
  const app = new App({
    target: document.querySelector(rootEl),
    data: {
      url: 'http://northwind.servicestack.net/customers.json'
    }
  });

  (<any>window).app = app; // for testing purposes only

  // detach the component and clean up
  // app.teardown();
};

export {
  Main
}