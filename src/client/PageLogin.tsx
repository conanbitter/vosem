import { useActionState, useContext, useState } from "react";
import type { LoginQuery, LoginResponse } from "../common"
import { useNavigate } from "react-router";
import { GlobalData } from "./GlobalData";

export function PageLogin() {
    const [fields, setFields] = useState({ login: "", password: "" });
    const [message, action, isPending] = useActionState(commitLogin, "");
    let navigate = useNavigate();
    const { setUsername } = useContext(GlobalData);


    async function commitLogin(prevState: string, formData: FormData) {
        const loginQuery: LoginQuery = {
            login: formData.get("login") as string,
            password: formData.get("password") as string
        }
        const response = await fetch("/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginQuery),
        });
        if (!response.ok) {
            setFields(loginQuery);
            return "Error loading";
        } else {
            const data: LoginResponse = await response.json();
            if (data.error) {
                setFields(loginQuery);
                return data.message;
            } else {
                if (setUsername) setUsername(data.username);
                navigate("/");
                return "";
            }
        }
    }

    return (
        <form action={action}>
            <p>{isPending ? "Loading..." : message}</p>
            <label htmlFor="login">Login:</label>
            <input name="login" id="login" defaultValue={fields.login} disabled={isPending} />
            <label htmlFor="password">Password:</label>
            <input name="password" type="password" id="password" defaultValue={fields.password} disabled={isPending} />
            <button type="submit" disabled={isPending}>Login</button>
        </form>
    )
}