/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { hydrateRoot } from 'react-dom/client'
import { ClientApp } from './App'
import type { GlobalDataType } from '../common';

declare const window: Window & typeof globalThis & {
    __INITIAL_DATA__: GlobalDataType
}

const initialData = window.__INITIAL_DATA__;

hydrateRoot(document, <ClientApp data={initialData} />)
