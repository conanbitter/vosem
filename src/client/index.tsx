/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

declare const window: Window & typeof globalThis & {
    __INITIAL_DATA__: { username: string }
}

import { hydrateRoot } from 'react-dom/client'
import { ClientApp } from './App'

const initialData = window.__INITIAL_DATA__;

hydrateRoot(document, <ClientApp username={initialData.username} />)
