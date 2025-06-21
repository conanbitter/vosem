import { BrowserRouter, StaticRouter } from "react-router";
import { routeList } from "./RouteList";
import type { GlobalDataType } from "../common";
import { Page } from "./Page";
import { GlobalData } from "./GlobalData";

export function ClientApp({ username }: { username: string }) {
    return (
        <Page initUsername={username}>
            <BrowserRouter>
                {routeList}
            </BrowserRouter>
        </Page>
    );
}

export function ServerApp({ location, data }: { location: string, data: GlobalDataType }) {
    GlobalData.tasks = data.tasks;
    return (
        <Page initUsername={data.username}>
            <StaticRouter location={location}>
                {routeList}
            </StaticRouter>
        </Page>
    );
}