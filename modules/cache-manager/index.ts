import { IStore } from './store.interface.ts'
import { MemoryStore } from '@/modules/cache-manager/stores/memory.store.ts'

export class CacheManager implements IStore
{
    constructor(
        private readonly store: IStore = new MemoryStore(),
    ) {}

    has(key: string): boolean
    {
        return this.store.getAll().has(key)
    }

    getKeys(): string[]
    {
        return Array.from(this.store.getAll().keys())
    }

    getAll()
    {
        return this.store.getAll()
    }

    get<T = any>(key: string)
    {
        return this.store.get(key) as T
    }

    set(key: string, value: any, ttl?: number)
    {
        this.store.set(key, value, ttl)
    }

    delete(key: string)
    {
        this.store.delete(key)
    }
}
