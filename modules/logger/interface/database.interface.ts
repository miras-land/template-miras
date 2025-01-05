export interface IDatabase
{
    tableName: string
    database(message: string, level: string, timestamp: string): Promise<void>
}
