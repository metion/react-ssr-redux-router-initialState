import App from '../common/containers/App';
import {Provider} from 'react-redux';
import React from 'react';
import configureStore from '../common/store/configureStore';
import express from 'express';
import {fetchCounter} from '../common/api/counter';
import qs from 'qs';
import {renderToString} from 'react-dom/server';
import serialize from 'serialize-javascript';
import {StaticRouter, matchPath} from "react-router-dom";
import routes from "../common/routes";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server.get("/api/news", (req, res) => {
    res.json([
        {
            id: 1,
            upvotes: 130,
            title: "Fianto Duri, the complete tutorial",
            author: "Məhəmməd",
            date: new Date("2017-04-14T15:30:00.000Z")
        },
        {
            id: 2,
            upvotes: 126,
            title: "Ordinary Wizarding Levels study guide",
            author: "BathBabb",
            date: new Date("2017-04-14T15:30:00.000Z")
        },
        {
            id: 3,
            upvotes: 114,
            title: "Is muggle-baiting ever acceptable?",
            author: "Falco",
            date: new Date("2017-04-14T15:30:00.000Z")
        },
        {
            id: 4,
            upvotes: 97,
            title: "Untransfiguration classes to become compulsory at Hogwarts",
            author: "Baddock",
            date: new Date("2017-04-14T15:30:00.000Z")
        },
        {
            id: 5,
            upvotes: 85,
            title: "Cracking the Aurologist Interview ",
            author: "Hetty",
            date: new Date("2017-04-14T15:30:00.000Z")
        },
        {
            id: 6,
            upvotes: 74,
            title: "Conserving waterplants cheatsheet.",
            author: "Otto",
            date: new Date("2017-04-14T15:30:00.000Z")
        },
        {
            id: 7,
            upvotes: 66,
            title: "The Pragmatic Dragon Feeder",
            author: "Baruffio",
            date: new Date("2017-04-14T15:30:00.000Z")
        },
        {
            id: 8,
            upvotes: 50,
            title: "The complete quidditch statistics",
            author: "Hbeery",
            date: new Date("2017-04-14T15:30:00.000Z")
        },
        {
            id: 9,
            upvotes: 34,
            title: "Cracking the Aurologist Interview ",
            author: "Marcusb",
            date: new Date("2017-04-14T15:30:00.000Z")
        },
        {
            id: 10,
            upvotes: 29,
            title: "Could wizards prevent WW3?",
            author: "Cuthbert",
            date: new Date("2017-04-14T15:30:00.000Z")
        },
        {
            id: 11,
            upvotes: 20,
            title: "ASK WN: What do you use to digitalize your scrolls?",
            author: "Alphard",
            date: new Date("2017-04-14T15:30:00.000Z")
        },
        {
            id: 12,
            upvotes: 16,
            title: "Show WN: Wand-Extinguishing Protection",
            author: "Humphrey22",
            date: new Date("2017-04-14T15:30:00.000Z")
        }
    ]);
});


server.disable('x-powered-by').use(express.static(process.env.RAZZLE_PUBLIC_DIR)).get('*', (req, res, next) => {
    // Read the counter from the request, if provided
    const params = qs.parse(req.query);
    const counter = parseInt(params.counter, 10) || 0;

    // Create a new Redux store instance
    const store = configureStore();

    const promises = routes.reduce((acc, route) => {
        if (matchPath(req.url, route) && route.comp && route.comp.initialAction) {
            acc.push(Promise.resolve(store.dispatch(route.comp.initialAction())));
        }
        return acc;
    }, []);

    // Render the component to a string
    Promise.all(promises)
        .then(response => {
            const context = {};
            const markup = renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App/>
                    </StaticRouter>
                </Provider>
            );

            // Grab the initial state from our Redux store
            const finalState = store.getState();

            res.send(`<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Razzle Redux Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''}
          ${process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
    </body>
</html>`);
        }).catch(next);


});

export default server;
