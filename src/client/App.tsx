import { BrowserRouter, StaticRouter } from "react-router";
import { routeList } from "./RouteList";
import type { GlobalDataType } from "../common";
import { Page } from "./Page";

export function ClientApp({ data }: { data: GlobalDataType }) {
    return (
        <Page initData={data}>
            <BrowserRouter>
                {routeList}
            </BrowserRouter>
        </Page>
    );
}

export function ServerApp({ location, data }: { location: string, data: GlobalDataType }) {
    return (
        <Page initData={data}>
            <StaticRouter location={location}>
                {routeList}
            </StaticRouter>
        </Page>
    );
}