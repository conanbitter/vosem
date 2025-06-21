/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { hydrateRoot } from 'react-dom/client'
import { ClientApp } from './App'
import type { GlobalDataType } from '../common';
import { GlobalData } from './GlobalData';

declare const window: Window & typeof globalThis & {
    __INITIAL_DATA__: GlobalDataType
}

const initialData = window.__INITIAL_DATA__;
GlobalData.tasks = initialData.tasks;

hydrateRoot(document, <ClientApp username={initialData.username} />)
