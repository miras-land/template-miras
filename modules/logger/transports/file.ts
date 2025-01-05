import { ITransport } from '../interface/transport.interface.ts'

export class FileFormat implements ITransport
{
    constructor(private readonly filePath: string) {}

    async log(message: string, level: string): Promise<void>
    {
        await Deno.writeTextFile(this.filePath, `${ level } - ${ message }\n`, {
            append: true,
        })
    }
}
