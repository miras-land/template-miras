import { IStore } from '../store.interface.ts'

export class MemoryStore implements IStore
{
    private store = new Map<string, any>()

    has(key: string): boolean
    {
        return this.store.has(key)
    }

    getKeys(): string[]
    {
        return Array.from(this.store.keys())
    }

    getAll()
    {
        return this.store
    }

    get<T = any>(key: string)
    {
        return this.store.get(key) as T
    }

    set(key: string, value: any, ttl?: number)
    {
        this.store.set(key, value)
        if (ttl) setTimeout(() => this.delete(key), ttl)
    }

    delete(key: string)
    {
        this.store.delete(key)
    }
}
