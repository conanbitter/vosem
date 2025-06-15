/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { hydrateRoot } from 'react-dom/client'
import { ClientApp } from './App'

hydrateRoot(document, <ClientApp />)
