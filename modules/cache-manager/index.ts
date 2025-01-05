export const store = new Map<string, any>()

export function get(key: string)
{
    return store.get(key)
}

export function set(key: string, value: any)
{
    return store.set(key, value)
}
