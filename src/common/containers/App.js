import React from 'react';
import routes from "../routes";
import {Route, Switch} from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

const App = () => {
    return (
        <>
            <Switch>
                {routes.map((route, i) => {
                    if (route.private) {
                        return (<PrivateRoute {...route} key={i}>{route.comp}</PrivateRoute>)
                    } else {
                        return (<Route component={route.comp} key={i} {...route} />)
                    }
                })}
            </Switch>
        </>
    );
};

export default App;
