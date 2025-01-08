import { IStore } from '../store.interface.ts'

export class MemoryStore implements IStore
{
    private store = new Map<string, any>()

    getAll()
    {
        return this.store
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
