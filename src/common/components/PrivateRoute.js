import {Route, Redirect} from "react-router-dom";
import React from "react";

const auth = true;
export default function PrivateRoute({children, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                auth ? (
                    React.createElement(children)
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}
