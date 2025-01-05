import { IFormatter } from '../interface/formatter.interface.ts'

export class JsonFormatter implements IFormatter
{
    format(message: string, level: string): string
    {
        return JSON.stringify({
            timestamp: new Date().toISOString(),
            level,
            message,
        })
    }
}
