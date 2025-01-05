import { RemoteTransport } from '@/modules/logger/transports/remote.ts'
import { Logger } from '@/modules/logger/index.ts'
import { ConsoleFormat } from '@/modules/logger/transports/console.ts'
import { RotateFileTransport } from '@/modules/logger/transports/rotating-file.ts'
import client from '@/modules/logger/database/config.database.ts'
import { DatabaseConfig } from '@/modules/logger/transports/database.ts'

async function insertLog(message: string, level: string, timestamp: string) {
    await (await client).execute(
        `INSERT INTO logs (message, level, timestamp) VALUES (?, ?, ?)`,
        [message, level, timestamp],
    )
}
const endpointsData = 'http://localhost/logs ' // example: http://localhost/logs  =>server
const logger = new Logger() // or json formatter
logger.addTransport(new RemoteTransport(endpointsData)) // in server
logger.addTransport(new ConsoleFormat())
logger.addTransport(
    new RotateFileTransport(1024 * 1024 * 100),
) // 100 MB
logger.addTransport(
    new DatabaseConfig({ tableName: 'logs', database: insertLog }),
)
logger.setLevel('debug')
logger.info('Hello World')
logger.debug('Debug message')
logger.warn('Warning message')
logger.error('Error message')
