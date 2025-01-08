import { IStore } from './store.interface.ts'
import { MemoryStore } from '@/modules/cache-manager/stores/memory.store.ts'

export class CacheManager implements IStore
{
    constructor(
        private readonly store: IStore = new MemoryStore(),
    ) {}

    getAll()
    {
        return this.store.getAll()
    }

    get<T = any>(key: string)
    {
        return this.store.get(key) as T
    }

    set(key: string, value: any)
    {
        this.store.set(key, value)
    }

    delete(key: string)
    {
        this.store.delete(key)
    }
}
