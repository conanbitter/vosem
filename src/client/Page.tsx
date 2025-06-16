import { useState } from "react";
import type { GlobalDataType } from "../common";
import { GlobalData } from "./GlobalData";

export function Page({ initData, children }: React.PropsWithChildren<{ initData: GlobalDataType }>) {
    const [username, setUsername] = useState(initData.username);
    const globalData: GlobalDataType = { username, setUsername };

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>Vosem</title>
            </head>
            <body>
                <GlobalData value={globalData}>
                    {children}
                </GlobalData>
            </body>
        </html>
    );
}