// deno-lint-ignore-file

const _store = new Map<string | number, any>()

export type CommandHandler = (data?: { key: string, command: string | number, data?: any }) => any

export function commandHandler(command: string | number, handler: CommandHandler): void
{
    _store.set(command, handler)
}

export function bootstrap(): void
{
    // @ts-expect-error
    self.onmessage = async (event) =>
    {
        const { key, command, data } = event.data
        const handler = _store.get(command)
        if (!handler)
            throw new Error(`No handler for command: ${ command }`)

        const result = await handler({ key, command, data })
        // @ts-expect-error
        self.postMessage({ key, command, data: result })
    }

    self.onerror = (error) =>
    {
        console.error("Error in worker:", error)
    }
}
