import { useContext, useEffect, useState } from "react";
import { GlobalData } from "./GlobalData";
import type { TasksResponse, TaskListItem } from "../common";

export function PageIndex() {
    const [list, setList] = useState<TaskListItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchList = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("/api/tasklist", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({}),
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

        fetchList();
    }, []);

    const htmlList = list.map((item) => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.state}</td>
            <td>{item.title}</td>
        </tr>
    ));

    return (
        <>
            {isLoading ? <p>Loading...</p> : (
                <table>
                    <tbody>
                        {htmlList}
                    </tbody>
                </table>
            )}
        </>
    );
}