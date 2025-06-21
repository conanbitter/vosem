import { useContext } from "react";
import { Link, Route, Routes, useSearchParams } from "react-router";
import { GlobalData } from "./GlobalData";
import { PageTasks } from "./PageTasks";
import { PageLogin } from "./PageLogin";

function React1() {
    const data = useContext(GlobalData);
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <>
            <h3>React 1 </h3>
            < p > User {data.username} </p>
            <p> Page {searchParams.get("page")}</p>
            < Link to="/react2" > To react2 </Link>
        </>
    )
}

function React2() {
    const data = useContext(GlobalData);
    return (
        <>
            <h3>React 2 </h3>
            < p > User {data.username} </p>
            < Link to="/react1" > To react1 </Link>
        </>
    )
}

export const routeList = (
    <Routes>
        <Route path="/tasks" element={<PageTasks />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/react1" element={< React1 />} />
        <Route path="/react2" element={< React2 />} />
    </Routes>);