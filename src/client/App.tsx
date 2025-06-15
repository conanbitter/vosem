import { useState } from "react";
import { BrowserRouter, Link, Route, Routes, StaticRouter } from "react-router";

function React1() {
    return (
        <>
            <h3>React 1</h3>
            <Link to="/react2">To react2</Link>
        </>
    )
}

function React2() {
    return (
        <>
            <h3>React 2</h3>
            <Link to="/react1">To react1</Link>
        </>
    )
}

const routes = (
    <Routes>
        <Route path="/react1" element={<React1 />} />
        <Route path="/react2" element={<React2 />} />
    </Routes>);

export function ClientApp() {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>React test</title>
            </head>
            <body>
                <BrowserRouter>
                    {routes}
                </BrowserRouter>
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
                <StaticRouter location={location}>
                    {routes}
                </StaticRouter>
            </body>
        </html>
    );
}