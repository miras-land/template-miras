import { ITransport } from '@/modules/logger/interface/transport.interface.ts'


export class RotateFileTransport implements ITransport
{
    constructor(private readonly maxSize: number, private readonly filePath: string = './logfile.log') {}

    async log(message: string, level: string): Promise<void>
    {
        const fileInfo = await Deno.stat(this.filePath).catch(() => null) // size file in deno
        if (fileInfo && fileInfo.size > this.maxSize)
        {
            const rotatedFileInfo = this.filePath.replace(
                ".log",
                `.${ Date.now() }.log`,
            )
            await Deno.rename(this.filePath, rotatedFileInfo)
        }
        await Deno.writeTextFile(this.filePath, `${ level } - ${ message }\n`, {
            append: true,
        })
    }
}
