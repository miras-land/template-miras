import { ITransport } from '../interface/transport.interface.ts'

export class ConsoleFormat implements ITransport
{
    log(message: string, level: string): void
    {
        console.log(`${ level } - ${ message }`)
    }
}
