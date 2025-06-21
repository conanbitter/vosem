import { createContext } from "react"
import type { GlobalDataType, GlobalUserDataType } from "../common";

const defaultUserData: GlobalUserDataType = { username: "Guest", setUsername: () => { } };
export const GlobalUserData = createContext(defaultUserData);

export const GlobalData: GlobalDataType = { username: "Guest" }