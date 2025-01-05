import '../config.loader.ts'

import type { ClientConfig } from 'mysql'
import { ClientMySQL, NessieConfig } from 'nessie'

const connectionConfig: ClientConfig = {
    hostname: Deno.env.get('DB_MYSQL_HOST') || 'localhost',
    port: +Deno.env.get('DB_MYSQL_PORT')! || 3306,
    username: Deno.env.get('DB_MYSQL_USER') || 'root',
    password: Deno.env.get('DB_MYSQL_PASS') || 'secret',
    db: Deno.env.get('DB_MYSQL_DB') || 'test',
}

const config: NessieConfig = {
    client: new ClientMySQL(connectionConfig),
    migrationFolders: [ './database/migrations' ],
    seedFolders: [ './database/seeds' ],
    debug: false,
}

export default config
