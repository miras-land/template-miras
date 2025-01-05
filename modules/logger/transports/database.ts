import { ITransport } from '../interface/transport.interface.ts'
import { IDatabase } from '../interface/database.interface.ts'

export class DatabaseConfig implements ITransport
{
    constructor(private readonly config: IDatabase) {}

    async log(message: string, level: string): Promise<void>
    {
        await this.config.database(message, level, new Date().toISOString())
    }
}
