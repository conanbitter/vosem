import { useContext } from "react";
import { GlobalData } from "./GlobalData";

export function PageIndex() {
    const data = useContext(GlobalData);
    return (
        <>
            <p>Hello, {data.username}!</p>
        </>
    );
}