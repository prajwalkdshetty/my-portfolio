import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';
import configureStore from './store/configureStore';
import { StateLoader } from './store/state-loader';
import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";

// import registerServiceWorker from './registerServiceWorker';

const store = configureStore( window.__REDUX_STATE__ || {} );

const AppBundle = (
    <ReduxProvider store={store}>
        <BrowserRouter>
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </BrowserRouter>
    </ReduxProvider>
);

const stateLoader = new StateLoader();
store.subscribe(() => {
    stateLoader.saveState(store.getState());
})

window.onload = () => {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(
            AppBundle,
            document.getElementById('root')
        );
    });
};

// registerServiceWorker();
