export interface IStore
{
    getAll(): Map<string, any>
    get<T = any>(key: string): T
    set(key: string, value: any): void
    delete(key: string): void
}
