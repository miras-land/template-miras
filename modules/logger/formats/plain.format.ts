import { IFormatter } from '../interface/formatter.interface.ts'

export class PlainFormatter implements IFormatter
{
    format(message: string, level: string): string
    {
        return ` ${ new Date().toISOString() } - ${ level } - ${ message }`
    }
}
