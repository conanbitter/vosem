import { useContext, useState } from "react";
import { BrowserRouter, Link, Route, Routes, StaticRouter } from "react-router";
import { GlobalData } from "./GlobalData";

function React1() {
    const username = useContext(GlobalData);
    return (
        <>
            <h3>React 1</h3>
            <p>User {username}</p>
            <Link to="/react2">To react2</Link>
        </>
    )
}

function React2() {
    const username = useContext(GlobalData);
    return (
        <>
            <h3>React 2</h3>
            <p>User {username}</p>
            <Link to="/react1">To react1</Link>
        </>
    )
}

const routes = (
    <Routes>
        <Route path="/react1" element={<React1 />} />
        <Route path="/react2" element={<React2 />} />
    </Routes>);

export function ClientApp({ username }: { username: string }) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>React test</title>
            </head>
            <body>
                <GlobalData value={username}>
                    <BrowserRouter>
                        {routes}
                    </BrowserRouter>
                </GlobalData>
            </body>
        </html>
    );
}

interface ServerParams {
    location: string,
    user?: { id: string, name: string }
}

export function ServerApp({ location, user }: ServerParams) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>React test</title>
            </head>
            <body>
                <GlobalData value={user?.name || "Guest"}>
                    <StaticRouter location={location}>
                        {routes}
                    </StaticRouter>
                </GlobalData>
            </body>
        </html>
    );
}