export const isServer = Boolean(globalThis.process); // ⚠️ beware of process polyfill client-side
export const isClient = !isServer;
export const isWindow = Boolean(globalThis.window);
export const isWorker = isClient && !isWindow;