export const isServer = !(globalThis.window);
export const isClient = !isServer;