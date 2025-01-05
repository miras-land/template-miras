import { Subject } from 'rxjs'

export class WorkerManager<Command = string | number>
{
    private readonly _workers: Worker[] = []
    private readonly _queue: Subject<{ key: string, command: Command, data?: any }> = new Subject()
    private _currentWorkerIndex = 0

    constructor(
        workerPath: string,
        count: number = navigator.hardwareConcurrency || 1,
    )
    {
        console.log(`Creating ${ count } worker(s)`)
        for (let i = 0;i < count;i++)
        {
            const worker = new Worker(workerPath, { type: 'module', name: `Worker ${ i }` })
            worker.onmessage = (event) => { this._queue.next(event.data) }
            worker.onerror = (error) => { this._queue.error(error.message); throw error }
            this._workers.push(worker)
        }
        Deno.addSignalListener("SIGINT", () =>
        {
            console.log("Shutting down...")
            this._workers.forEach(worker => worker.terminate())
            Deno.exit()
        })
    }

    postCommand(command: Command, data?: any): Promise<any>
    {
        if (this._workers.length === 0)
            throw new Error('No workers available')

        const key = Math.random().toString(36).substring(2)

        return new Promise((resolve) =>
        {
            const timeoutHandler = setTimeout(() =>
            {
                console.warn('WorkerManager: Timeout')
                this._workers[ this._currentWorkerIndex ].postMessage({ key, action: 'terminate' })
            }, 30_000)

            const subscription = this._queue.subscribe((value) =>
            {
                if (value.key === key && value.command === command)
                {
                    clearTimeout(timeoutHandler)
                    subscription.unsubscribe()
                    resolve(value.data)
                }
            })


            this._workers[ this._currentWorkerIndex ].postMessage({ key, command, data })

            if (this._currentWorkerIndex < this._workers.length - 1)
                this._currentWorkerIndex++
            else this._currentWorkerIndex = 0
        })
    }
}
