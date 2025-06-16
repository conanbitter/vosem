import { createContext } from "react"
import type { GlobalDataType } from "../common";

const defaultData: GlobalDataType = { username: "Guest" };
export const GlobalData = createContext(defaultData);