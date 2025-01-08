export interface IStore
{
    has(key: string): boolean
    getKeys(): string[]
    getAll(): Map<string, any>
    get<T = any>(key: string): T
    set(key: string, value: any, ttl?: number): void
    delete(key: string): void
}
