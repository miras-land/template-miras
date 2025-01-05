import { ITransport } from '@/modules/logger/interface/transport.interface.ts'

export class RemoteTransport implements ITransport {
    constructor(private readonly endpoint: string) {}
    async log(message: string, level: string): Promise<void> {
        const logdata = { message, level, timestamp: new Date().toISOString() }

        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logdata),
            })
            response.json().then((data) => {
                if (!data.ok) {
                    console.error('Failed to fetch remote transport server :', response.statusText)
                }
            })
        } catch (error) {
            console.error('Error sending log to remote transport server:', error)
        }
    }
}
