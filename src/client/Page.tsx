import { useState } from "react";
import type { GlobalDataType, GlobalUserDataType } from "../common";
import { GlobalUserData } from "./GlobalData";

export function Page({ initUsername, children }: React.PropsWithChildren<{ initUsername: string }>) {
    const [username, setUsername] = useState(initUsername);
    const globalUserData: GlobalUserDataType = { username, setUsername };

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>Vosem</title>
            </head>
            <body>
                <GlobalUserData value={globalUserData}>
                    {children}
                </GlobalUserData>
            </body>
        </html>
    );
}