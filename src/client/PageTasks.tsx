import { useContext, useEffect, useRef, useState } from "react";
import { GlobalData } from "./GlobalData";
import type { TasksResponse, TaskListItem } from "../common";
import { Link, useSearchParams } from "react-router";

interface PaginatorProps {
    page: number,
    pageCount: number,
    onChangePage: (newPage: number) => void
}

function Paginator(props: PaginatorProps) {
    const pages = [];
    for (let i = 1; i <= props.pageCount; i++) {
        pages.push(<button onClick={() => { props.onChangePage(i) }} key={i} disabled={i == props.page}>{i}</button>);
    }
    return <div>{pages}</div>
}

interface TaskListProps {
    page: number,
    onPageCountChange: (newCount: number) => void
}

function TaskList(props: TaskListProps) {
    const [list, setList] = useState<TaskListItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const isInitialMount = useRef(true);

    async function fetchList() {
        try {
            setIsLoading(true);
            const response = await fetch("/api/tasklist", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ page: props.page }),
            });
            if (response.ok) {
                const data: TasksResponse = await response.json();
                if (data.error) {
                    console.error("Error fetching list:", data.message);
                } else {
                    setList(data.list);
                    props.onPageCountChange(data.pages);
                }
            } else {
                console.error(`Error fetching list (code ${response.status})`);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching list:", error);
        }
    }

    useEffect(() => {
        let loaded = false;
        if (isInitialMount.current) {
            if (GlobalData.tasks) {
                setList(GlobalData.tasks.list)
                loaded = true;
            }
            isInitialMount.current = false;
        }
        if (!loaded) {
            fetchList();
        }
    }, [props.page]);

    const htmlList = list.map((item) => (
        isLoading ? <tr key={item.id}><td></td><td></td><td>Loading...</td></tr> :
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.state}</td>
                <td>{item.title}</td>
            </tr>
    ));

    return (
        <table>
            <tbody>
                {htmlList}
            </tbody>
        </table>
    )
}

export function PageTasks() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        if (GlobalData.tasks) {
            setPageCount(GlobalData.tasks.pages);
        }
    }, []);

    function getPage(): number {
        const page = parseInt(searchParams.get("page") || "");
        return Number.isNaN(page) ? 1 : page;
    }

    function setPage(newPage: number) {
        setSearchParams({ page: newPage.toString() });
    }

    return (
        <>
            <Link to="/test"> To test </Link>
            <TaskList page={getPage()} onPageCountChange={setPageCount} />
            <Paginator page={getPage()} pageCount={pageCount} onChangePage={setPage} />
        </>
    );
}