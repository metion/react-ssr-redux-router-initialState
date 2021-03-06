import React from 'react';
import {hydrate} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import {BrowserRouter} from "react-router-dom";

const store = configureStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

hydrate(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)
;

if (module.hot) {
    module.hot.accept('../common/containers/App', () => {
        hydrate(
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>,
            document.getElementById('root')
        )
        ;
    });
}
