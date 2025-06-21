import { useContext, useEffect, useState } from "react";
import { GlobalData } from "./GlobalData";
import type { TasksResponse, TaskListItem } from "../common";
import { useSearchParams } from "react-router";

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
    page: number
}

function TaskList(props: TaskListProps) {
    const [list, setList] = useState<TaskListItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
        fetchList();
    }, [props.page]);

    const htmlList = list.map((item) => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.state}</td>
            <td>{item.title}</td>
        </tr>
    ));

    return (
        isLoading ? <p>Loading...</p> : (
            <table>
                <tbody>
                    {htmlList}
                </tbody>
            </table>
        )
    );
}

export function PageIndex() {

    const [searchParams, setSearchParams] = useSearchParams();

    function getPage(): number {
        const page = parseInt(searchParams.get("page") || "");
        return Number.isNaN(page) ? 1 : page;
    }

    function setPage(newPage: number) {
        setSearchParams({ page: newPage.toString() });
    }

    return (
        <>
            <TaskList page={getPage()} />
            <Paginator page={getPage()} pageCount={10} onChangePage={setPage} />
        </>
    );
}