import { useState } from "react";

export default function App() {
    const [count, setCount] = useState(0);
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>React test</title>
            </head>
            <body>
                <h1>Counter {count}</h1>
                <button onClick={() => setCount(count + 1)}>Increment</button>
            </body>
        </html>
    );
}