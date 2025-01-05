import { JsonFormatter } from './formats/json.format.ts'
import { IFormatter } from './interface/formatter.interface.ts'
import { ITransport } from './interface/transport.interface.ts'

export class Logger
{
    private transport: ITransport[] = [];
    private defaultFormatter: IFormatter = new JsonFormatter()
    private Currentlevel: string = "info";

    constructor(options?: { defaultFormatter?: IFormatter })
    {
        if (options?.defaultFormatter)
            this.defaultFormatter = options.defaultFormatter
    }

    setLevel(level: string): void {
        this.Currentlevel = level;
      }
    addTransport(transport: ITransport): void
    {
        this.transport.push(transport)
    }

    addLog(message: string, level: string): void
    {

        const levels = ["info", "warn", " debug", " error "];
    if (levels.indexOf(level) >= levels.indexOf(this.Currentlevel)) {
      const formatMessage = this.defaultFormatter.format(message, level);
      Promise.all(
        this.transport.map((transport) =>
          transport.log(formatMessage, level)
        ),
      ).catch((err) => console.error("Error logging", err));
    }
    }

    info(message: string): void
    {
        this.addLog(message, "INFO")
    }

    debug(message: string): void
    {
        this.addLog(message, "DEBUG")
    }

    warn(message: string): void
    {
        this.addLog(message, "WARN")
    }

    error(message: string): void
    {
        this.addLog(message, "ERROR")
    }
}
