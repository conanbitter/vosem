import type { GlobalDataType } from "../common";
import { GlobalData } from "./GlobalData";

export function Page({ initData, children }: React.PropsWithChildren<{ initData: GlobalDataType }>) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>Vosem</title>
            </head>
            <body>
                <GlobalData value={initData}>
                    {children}
                </GlobalData>
            </body>
        </html>
    );
}